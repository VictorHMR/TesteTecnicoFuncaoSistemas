var beneficiarios = JSON.parse(sessionStorage.getItem('beneficiarios') ?? '[]');

function adicionarBeneficiario(nome, cpf) {
    if (beneficiarios.filter(x => x.cpf == cpf).length > 0) {
        $('#alertas').html('O cpf digitado já existe como beneficiário.');
    }
    else if (!validarCPF(cpf)) {
        $('#alertas').html('Cpf inválido. Confira o número digitado');
    }
    else {
        $('#alertas').html('');

        beneficiarios.push({
            nome,
            cpf
        });

        sessionStorage.setItem('beneficiarios', JSON.stringify(beneficiarios));
        atualizarTabelaBeneficiarios();

        $('#nomeBeneficiario').val('');
        $('#cpfBeneficiario').val('');
    }

}

function editarBeneficiario() {
    if (!validarCPF($('#cpfBeneficiario').val())) {
        $('#alertas').html('Cpf inválido. Confira o número digitado');
    }
    else {
        $('#alertas').html('');

        beneficiarios[$('#editItemID').val()].nome = $('#nomeBeneficiario').val();
        beneficiarios[$('#editItemID').val()].cpf = $('#cpfBeneficiario').val();
        sessionStorage.setItem('beneficiarios', JSON.stringify(beneficiarios));

        atualizarTabelaBeneficiarios();

        $('#nomeBeneficiario').val('');
        $('#cpfBeneficiario').val('');
        $('#btnAdicionarBeneficiario').show();
        $('#btnSalvarBeneficiario').hide();
        $('#editItemID').val(0);
    }
}

function removerBeneficiarios(index) {
    beneficiarios.splice(index, 1);

    atualizarTabelaBeneficiarios();
    sessionStorage.setItem('beneficiarios', JSON.stringify(beneficiarios));
}

function btnEditarBeneficiario(index) {
    $('#btnAdicionarBeneficiario').hide();
    $('#btnSalvarBeneficiario').show();
    $('#nomeBeneficiario').val(beneficiarios[index].nome);
    $('#cpfBeneficiario').val(beneficiarios[index].cpf);
    $('#editItemID').val(index);
}

function atualizarTabelaBeneficiarios() {
    $('#gridBeneficiarios tbody').empty();
    beneficiarios.forEach(function (beneficiario, index) {
        $('#gridBeneficiarios tbody').append('<tr><td>' + beneficiario.nome + '</td><td>' + beneficiario.cpf + '</td>   <td style="display:flex;justify-content:space-evenly"><button onClick="btnEditarBeneficiario(' + index + ')" class="btn btn-primary">Alterar</button><button onClick="removerBeneficiarios(' + index + ')"  class="btn btn-primary">Excluir</button></td> </tr>');
    });
}


$(document).ready(function () {
    beneficiarios = JSON.parse(sessionStorage.getItem('beneficiarios') ?? '[]');

    $('#btnBeneficiarios').click(function (e) {
        atualizarTabelaBeneficiarios();

        e.preventDefault();
        $('#cpfBeneficiario').mask('000.000.000-00', { reverse: false });
        $('#modalBeneficiarios').modal('show');



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
