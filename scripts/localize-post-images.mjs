import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const postsRoot = join(root, 'src', 'content');
const imageRoot = join(root, 'public', 'assets', 'image');

async function listMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listMarkdownFiles(path)));
    else if (/\.mdx?$/.test(entry.name)) files.push(path);
  }

  return files;
}

function articleImageReferences(source, articlePath) {
  const refs = [];
  const add = (url) => refs.push({ url, articlePath });

  for (const match of source.matchAll(/^cover:\s*(https?:\/\/\S+)\s*$/gm)) add(match[1]);
  for (const match of source.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) add(match[1]);

  return refs;
}

function articleDirectory(articlePath) {
  const normalized = relative(join(root, 'src', 'content'), articlePath).split('/');
  const postsIndex = normalized.indexOf('posts');
  const pathParts = normalized.slice(postsIndex + 1);
  pathParts[pathParts.length - 1] = pathParts[pathParts.length - 1].replace(/\.[^.]+$/, '');
  return pathParts.join('/');
}

function safeFileName(pathname, contentType) {
  const original = basename(pathname);
  if (extname(original)) return original;

  const type = contentType.split(';', 1)[0].toLowerCase();
  const extension = {
    'image/avif': '.avif',
    'image/gif': '.gif',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/svg+xml': '.svg',
    'image/webp': '.webp',
  }[type] ?? '.bin';
  return `${original || 'image'}${extension}`;
}

const files = (await Promise.all(
  ['zh', 'en'].map((lang) => listMarkdownFiles(join(postsRoot, lang, 'posts'))),
)).flat().sort();

const articles = new Map();
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const reference of articleImageReferences(source, file)) {
    if (!articles.has(reference.url)) articles.set(reference.url, reference.articlePath);
  }
}

const localPaths = new Map();
for (const [url, articlePath] of articles) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'windson-blog-image-localizer/1.0' },
  });
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`URL is not an image: ${url} (${contentType || 'unknown content type'})`);
  }

  const pathname = new URL(url).pathname;
  const filename = safeFileName(pathname, contentType);
  const directory = join(imageRoot, articleDirectory(articlePath));
  const destination = join(directory, filename);
  await mkdir(directory, { recursive: true });
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));

  const publicPath = `/${relative(join(root, 'public'), destination).split('\\').join('/')}`;
  localPaths.set(url, publicPath);
  console.log(`${url} -> ${publicPath}`);
}

for (const file of files) {
  const original = await readFile(file, 'utf8');
  const updated = original.replace(
    /https?:\/\/[^\s)]+/g,
    (url) => localPaths.get(url) ?? url,
  );
  if (updated !== original) await writeFile(file, updated);
}

console.log(`Localized ${localPaths.size} unique image URLs referenced by ${files.length} posts.`);
