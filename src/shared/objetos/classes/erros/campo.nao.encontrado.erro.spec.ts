import { CampoNaoEncontradoErro } from "./campo.nao.encontrado.erro"

describe('CampoNaoEncontradoErro', () => {

  describe('constructor', () => {
    it('deve criar um novo erro', () => {
      const erro = new CampoNaoEncontradoErro('usuario')
      expect(erro.campo).toBe('usuario')
      expect(erro.mensagens[0]).toBe('Usuário não encontrado.')
    })
  })
})