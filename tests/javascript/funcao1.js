const usuario = "qa_teste"
const senhaValida = true;
let tentativas = 4;

function validarLogin(senhaValida, tentativas){
  if (senhaValida === true && tentativas < 3)
     {
         return true;
     }

  return false;
}
const resultado = validarLogin(senhaValida, tentativas)
console.log(resultado);

