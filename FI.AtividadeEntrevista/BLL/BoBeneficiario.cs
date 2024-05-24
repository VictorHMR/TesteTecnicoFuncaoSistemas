using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Incluir(beneficiario);
        }

        public List<DML.Beneficiario> Listar(long IdCliente)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.Consultar(IdCliente);
        }

        public void Alterar(Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Alterar(beneficiario);
        }

        public void Remover(long IdCliente)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Remover(IdCliente);
        }

        public bool PesqBeneficiarioCPF(string CPF, long IdCliente)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.PesqBeneficiarioCPF(CPF, IdCliente);
        }
    }
}
