const RULES = {
  required: (v: any) => !!v || 'Ce champ est obligatoire',
  notEmpty: (v: any) => (v && v.length > 0) ? true : 'Veuillez choisir au moins une valeur',
  strictLength: (len: number, err?: string) => (v: any) => (!v || v.length === len) ? true : (err || 'La longueur du champ saisie est invalide'),
  minLength: (len: number, err?: string) => (v: any) => (!v || v.length >= len) ? true : (err || `Vous devez saisir au moins ${len} caractère(s)`),
  maxLength: (len: number, err?: string) => (v: any) => (!v || v.length <= len) ? true : (err || `Vous devez saisir ${len} caractère(s) maximum`),
  minimum: (n: number, err?: string) => (v: any) => (!v || v >= n) ? true : (err || `min: ${n}`),
  maximum: (n: number, err?: string) => (v: any) => (!v || v <= n) ? true : (err || `max: ${n}`),
  pattern: (pattern: string, err?: string) => (v: any) => (!v || RegExp(pattern).test(v) ? true : (err || `Format invalide`))
}

export default RULES
