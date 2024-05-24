var beneficiarios = [];

async function listBeneficiarios() {
    await $.ajax({
        url: urlGetBeneficiarios,
        method: "POST",
        data: {
            "IdCliente": obj.Id
        },
        success:
            function (e) {
                beneficiarios = e.Records;

            }

    });
}

async function adicionarBeneficiario(nome, cpf) {
    if (beneficiarios.filter(x => x.Cpf == cpf).length > 0) {
        $('#alertas').html('O cpf digitado já existe como beneficiário.');
    }
    else if (!validarCPF(cpf)) {
        $('#alertas').html('Cpf inválido. Confira o número digitado');
    }
    else if ($('#nomeBeneficiario').val() && $('#cpfBeneficiario').val()){
        $('#alertas').html('');
        await $.ajax({
            url: urlInserirBeneficiario,
            method: "POST",
            data: {
                "IdCliente": obj.Id,
                "Nome": $('#nomeBeneficiario').val(),
                "Cpf": $('#cpfBeneficiario').val(),
            },
            success:
                async function (r) {
                    await listBeneficiarios();
                    await atualizarTabelaBeneficiarios();

                }
        })

        $('#nomeBeneficiario').val('');
        $('#cpfBeneficiario').val('');
    }

}

async function editarBeneficiario() { 
    if (beneficiarios.filter(x => x.Cpf == $('#cpfBeneficiario').val()).length > 0) {
        $('#alertas').html('O cpf digitado já existe como beneficiário.');
    }
    else if (!validarCPF($('#cpfBeneficiario').val())) {
        $('#alertas').html('Cpf inválido. Confira o número digitado');
    }
    else if ($('#nomeBeneficiario').val() && $('#cpfBeneficiario').val() && $('#editItemID').val() != 0) {
        $('#alertas').html('');

        $.ajax({
            url: urlAlterarBeneficiario,
            method: "POST",
            data: {
                "Id": $('#editItemID').val(),
                "Nome": $('#nomeBeneficiario').val(),
                "Cpf": $('#cpfBeneficiario').val(),
                "IdCliente": obj.Id,
            },
            error:
                function (r) {
                    $('#alertas').html(r.responseJSON);
                },
            success:
                async function (r) {
                    await listBeneficiarios();
                    await atualizarTabelaBeneficiarios();
                }
        })
        $('#nomeBeneficiario').val('');
        $('#cpfBeneficiario').val('');
        $('#btnAdicionarBeneficiario').show();
        $('#btnSalvarBeneficiario').hide();
        $('#btnSalvarBeneficiario').hide();
    }

}

async function removerBeneficiarios(Id) {
    await $.ajax({
        url: urlRemoverBeneficiario,
        method: "POST",
        data: {
            "Id": Id
        },
        success:
            async function (r) {
                await listBeneficiarios();
                await atualizarTabelaBeneficiarios();

            }
    })
}

function btnEditarBeneficiario(index) {
    $('#btnAdicionarBeneficiario').hide();
    $('#btnSalvarBeneficiario').show();
    $('#nomeBeneficiario').val(beneficiarios[index].Nome);
    $('#cpfBeneficiario').val(beneficiarios[index].Cpf);
    $('#editItemID').val(beneficiarios[index].Id);
}

function atualizarTabelaBeneficiarios() {
    $('#gridBeneficiarios tbody').empty();
    beneficiarios.forEach(function (beneficiario, index) {
        $('#gridBeneficiarios tbody').append('<tr><td>' + beneficiario.Nome + '</td><td>' + beneficiario.Cpf + '</td>  <td style="display:flex;justify-content:space-evenly"><button onClick="btnEditarBeneficiario(' + index + ')" class="btn btn-primary">Alterar</button><button onClick="removerBeneficiarios(' + beneficiario.Id + ')"  class="btn btn-primary">Excluir</button></td> </tr>');
    });
}

$(document).ready(function () {
    listBeneficiarios();

    $('#btnBeneficiarios').click(function (e) {
        atualizarTabelaBeneficiarios();

        e.preventDefault();
        $('#modalBeneficiarios').modal('show');
        $('#cpfBeneficiario').mask('000.000.000-00', { reverse: false });



        $('#btnAdicionarBeneficiario').click(function (e) {
            e.preventDefault();
            var nomeBeneficiario = $('#nomeBeneficiario').val();
            var cpfBeneficiario = $('#cpfBeneficiario').val();
            adicionarBeneficiario(nomeBeneficiario, cpfBeneficiario);
        });

        $('#btnSalvarBeneficiario').click(function (e) {
            editarBeneficiario();
        });

        $('#modalBeneficiarios').on('hidden.bs.modal', function () {
            $('#beneficiariosHiddenInput').val(JSON.stringify(beneficiarios));
        });
    });



});
