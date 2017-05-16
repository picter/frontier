import * as kramed from 'kramed';

export default fileContent =>
  `<div class="container markdown">${kramed(fileContent)}</div>`;
