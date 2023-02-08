export enum TransactionType {
  readonly = 'readonly',
  readwrite = 'readwrite',
}

export enum CursorDirection {
  next = 'next',
  nextunique = 'nextunique',
  prev = 'prev',
  prevunique = 'prevunique',
}

export enum TemplateCreateDBKeys {
  tasks = 'tasks',
  taskGarbages = 'taskGarbages',
  snapshot = 'snapshot',
}
