
const cookieParse = require('cookie-parser')
const session = require('express-session')
const fs = require('fs');

module.exports = (app) => {



  app.use(cookieParse())
  app.use(
    session({
      secret: 'segredo-da-sessao',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000, // min x seg x mls
      },
    })
  )



  const usersRoutes = require('./usersRoutes')
  app.use('/users', usersRoutes)

  const colecaoRoutes = require('./colecaoRoutes')
  app.use('/colecao', colecaoRoutes)

  const avaliacaoRoutes = require('./avaliacaoRoutes')
  app.use('/avaliacao', avaliacaoRoutes)

  const enviaEmailRoutes = require('./enviaEmailRoutes')
  app.use('/enviaEmail', enviaEmailRoutes)

  
//primeira parte
  app.get('/', (req, res) => {

    const conteudoObjetivo = fs.readFileSync('./conteudo/objetivoLogin.txt', 'utf8');
    res.render("login", { conteudoObjetivo: conteudoObjetivo });
  })
  app.get('/conteudo', (req, res) => {

    const conteudoSobre = fs.readFileSync('./conteudo/objetivoLogin.txt', 'utf8');
    const funcionamento1 = fs.readFileSync('./conteudo/funcionamento1.txt', 'utf8');
    const funcionamento2 = fs.readFileSync('./conteudo/funcionamento2.txt', 'utf8');
    const problemas1 = fs.readFileSync('./conteudo/problemas1.txt', 'utf8');
    const problemas2 = fs.readFileSync('./conteudo/problemas2.txt', 'utf8');

    res.render("sobreSite", { conteudoSobre: conteudoSobre, funcionamento1: funcionamento1, funcionamento2: funcionamento2, problemas1: problemas1, problemas2: problemas2 });
  })

  app.get('/tecnologia', (req, res) => {

    const tecnologias = fs.readFileSync('./conteudo/tecnologias.txt', 'utf8');
    res.render("tecnologias", { tecnologias: tecnologias});
  })

  app.get('/sobreCriador', (req, res) => {
    res.render("sobreCriador");
  })

  app.get('/contato', (req, res) => {
    res.render("contato");
  })
//fim da primeira parte

  app.get('/cards', (req, res) => {
    let rota
    let pass_user_login
    if (req.session.name_user_login) {
      pass_user_login = req.session.name_user_login
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
    } else {
      pass_user_login = "Login";
      rota = "/"
    }
    res.render("inicio", { pass_user_login: pass_user_login, rota: rota });
  })

  app.get('/inicio', (req, res) => {
    res.render("login")
  })

  app.get('/relatorioUsuario', (req, res) => {
    res.render('relatorioUsuario');
  });
  /*
  app.get('/relatorioUsuarioPDF', async (req, res) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      await page.goto('http://localhost:3000/relatorioUsuario', { waitUntil: 'networkidle0' });
      await page.waitForTimeout(2000); 
      const pdf = await page.pdf({ format: 'A4' });
  
      await browser.close();
  
      res.contentType('application/pdf');
      res.send(pdf);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      res.status(500).send('Erro ao gerar o PDF');
    }
  });
  */
  

  app.get('/cadastrarColecao', (req, res) => {
    if (req.session.name_user_login) {
      pass_user_login = req.session.name_user_login
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
      res.render("cadastrarColecao", { pass_user_login: pass_user_login, rota: rota });
    } else {
      pass_user_login = "Login";
      res.redirect('/inicio');
    }
    
  })

  app.get('/telaAvaliacao', (req, res) => {
    let pass_user_login
    let rota
    const name = req.query.name_colecao1;
    const image = req.query.img_colecao1;
    if (req.session.name_user_login) {
      pass_user_login = req.session.name_user_login
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
      res.render("telaAvaliacao", { name: name, image: image, pass_user_login: pass_user_login, rota: rota });
    } else {
      pass_user_login = "Login";
      res.redirect('/inicio');
    }
  })

  app.get('/telaAtualizaAvaliacao', (req, res) => {
    let pass_user_login
    let rota
    const name_avaliacao = req.query.name_avaliacao;
    const mensagem_avaliacao = req.query.mensagem_avaliacao;
    const _id = req.query._id;
    if (req.session.name_user_login) {
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
      pass_user_login = req.session.name_user_login
      res.render("telaAtualizaAvaliacao", { name_avaliacao: name_avaliacao, mensagem_avaliacao: mensagem_avaliacao, _id: _id, pass_user_login: pass_user_login, rota: rota });
    } else {
      pass_user_login = "Login";
      res.redirect('/inicio');
    }

  })

  app.get('/atualizarColecao', (req, res) => {
    let pass_user_login
    let rota
    const name_colecao = req.query.name_colecao;
    const img_colecao = req.query.img_colecao;
    const _id = req.query._id;
    if (req.session.name_user_login) {
      pass_user_login = req.session.name_user_login
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
      res.render("atualizarColecao", { name_colecao: name_colecao, img_colecao: img_colecao, _id: _id, pass_user_login: pass_user_login, rota: rota });
    } else {
      pass_user_login = "Login";
      res.redirect('/inicio');
    }

  })

  app.get('/atualizarUsuario', (req, res) => {
    let pass_user_login
    let rota

    if (req.session.name_user_login) {
      pass_user_login = req.session.name_user_login
      rota = "/atualizarUsuario?name_user={{pass_user_login}}"
    } else {
      pass_user_login = "Login";
      rota = "/"
    }

    res.render("atualizarUsuario", { pass_user_login: pass_user_login, rota: rota });
  })

  app.post('/tecnologia', (req, res) => {
    res.redirect('/tecnologias');
  })

  app.post('/relatorioUsuario', (req, res) => {
    res.redirect('/relatorioUsuario');
  })

  app.post('/telaAvaliacao', (req, res) => {
    res.redirect('/telaAvaliacao');
  })

  app.post('/atualizarUsuario', (req, res) => {
    res.redirect('/atualizarUsuario');
  })

  app.post('/atualizarColecao', (req, res) => {
    res.redirect('/atualizarColecao');
  })

  app.post('/telaAtualizaAvaliacao', (req, res) => {
    res.redirect('/telaAtualizaAvaliacao');
  })

  app.post('/cadastrarColecao', (req, res) => {
    res.redirect('/cadastrarColecao');
  })

  app.post('/sobreCriador', (req, res) => {
    res.redirect('/sobreCriador');
  })

  app.post('/contato', (req, res) => {
    res.redirect('/contato');
  })

  app.post('/inicio', (req, res) => {
    res.redirect('/');
  })

}