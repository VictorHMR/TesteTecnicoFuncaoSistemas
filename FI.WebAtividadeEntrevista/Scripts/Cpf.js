function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = soma % 11;
    var digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) return false;

    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    var digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) return false;

    return true;
}

function aplicarMascaraCPF(input, mascara) {
    var texto = input.value.replace(/\D/g, ''); 
    var textoFormatado = '';
    var indiceMascara = 0;

    for (var i = 0; i < texto.length && indiceMascara < mascara.length; i++) {
        if (mascara.charAt(indiceMascara) === '9') {
            textoFormatado += texto.charAt(i);
            indiceMascara++;
        } else {
            textoFormatado += mascara.charAt(indiceMascara);
        }
        indiceMascara++;
    }

    input.value = textoFormatado;
}