import * as kramed from 'kramed';

export default fileContent =>
  `<div class="container">${kramed(fileContent)}</div>`;
