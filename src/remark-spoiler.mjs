const spoilerPattern = /\|\|([^|\n]+?)\|\|/g;

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export default function remarkSpoiler() {
  return (tree) => {
    const transform = (node) => {
      if (!node.children) return;

      const children = [];
      for (const child of node.children) {
        if (child.type !== 'text') {
          transform(child);
          children.push(child);
          continue;
        }

        let lastIndex = 0;
        let match;
        spoilerPattern.lastIndex = 0;
        while ((match = spoilerPattern.exec(child.value)) !== null) {
          if (match.index > lastIndex) {
            children.push({ type: 'text', value: child.value.slice(lastIndex, match.index) });
          }
          children.push({
            type: 'html',
            value: `<span class="spoiler" tabindex="0">${escapeHtml(match[1])}</span>`,
          });
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex === 0) {
          children.push(child);
        } else if (lastIndex < child.value.length) {
          children.push({ type: 'text', value: child.value.slice(lastIndex) });
        }
      }
      node.children = children;
    };

    transform(tree);
  };
}
