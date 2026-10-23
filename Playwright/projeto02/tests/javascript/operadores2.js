const usuario = "qa_teste"
const senhaValida = true;
let tentativas = 2;

if (senhaValida === true && tentativas < 3)
   {
       console.log("Login aprovado")
   }
else {
   console.log("Login bloqueado")
}