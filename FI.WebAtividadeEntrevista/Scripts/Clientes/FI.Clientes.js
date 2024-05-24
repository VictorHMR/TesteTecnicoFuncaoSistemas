
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        if (validarCPF($(this).find("#Cpf").val())) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Cpf": $(this).find("#Cpf").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val()
                },
                error:
                    function (r) {
                        console.log(r)
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        var beneficiarios = JSON.parse(sessionStorage.getItem('beneficiarios') ?? '[]');
                        if (beneficiarios.length > 0) {
                            beneficiarios.forEach(beneficiario => {
                                $.ajax({
                                    url: urlPostBeneficiario,
                                    method: "POST",
                                    data: {
                                        "Nome": beneficiario.nome,
                                        "CPF": beneficiario.cpf,
                                        "IdCliente": r.id
                                    },
                                })
                            })
                            sessionStorage.removeItem('beneficiarios');
                            ModalDialog("Sucesso!", r.Message)
                            $("#formCadastro")[0].reset();
                            
                        }
                        else {
                            sessionStorage.removeItem('beneficiarios');
                            ModalDialog("Sucesso!", r.Message)
                            $("#formCadastro")[0].reset();
                        }
                    }
            });
        }
        else {
            ModalDialog("Ocorreu um erro", "Numero invalido, verifique o CPF digitado.");
        }
        
    })
    
})
$('#Cpf').mask('000.000.000-00', { reverse: false });



function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

