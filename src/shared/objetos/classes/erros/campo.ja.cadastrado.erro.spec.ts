import { CampoJaCadastradoErro } from "./campo.ja.cadastrado.erro"

describe('CampoJaCadastradoErro', () => {
  describe('constructor', () => {
    it('deve criar um novo erro', () => {
      const erro = new CampoJaCadastradoErro('email')
      expect(erro.campo).toBe('email')
      expect(erro.mensagens[0]).toBe('E-mail já cadastrado.')
    })

    it('deve jogar um erro quando campo for undefined', () => {
      expect(() => new CampoJaCadastradoErro(undefined)).toThrowError()
    })

    it('deve jogar um erro quando campo for null', () => {
      expect(() => new CampoJaCadastradoErro(null)).toThrowError()
    })
  })
})