import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'CLEAN TS API',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0',
    contact: {
      name: 'Roberto Kang',
      url: 'https://www.linkedin.com/in/robertoakang'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  externalDocs: {
    description: 'Link para o treinamento completo do Rodrigo Manguinho',
    url: 'https://www.udemy.com/share/102x5i3@7iqnKrTJ3s_6f1xryghpRe0STehMNy4FmxgpdgGiuLvCMHTzxcJfgIqPT7y_rpw3/'
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Enquetes',
    description: 'APIs relacionadas a Enquete'
  }],
  paths,
  schemas,
  components
}
