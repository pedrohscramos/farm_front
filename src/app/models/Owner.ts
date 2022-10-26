export interface Owner {
  id: number
  name: string
  document: string
  document_type: 'CPF' | 'CNPJ'
  creation_date?: Date
}
