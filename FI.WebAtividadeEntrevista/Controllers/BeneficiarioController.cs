using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Incluir()
        {
            return View();
        }


        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if(bo.PesqBeneficiarioCPF(model.Cpf, model.IdCliente))
                {
                    Response.StatusCode = 400;
                    return Json("O CPF informado já está cadastrado como beneficiário para esse cliente.");
                }
                bo.Incluir(new Beneficiario()
                {
                   Cpf = model.Cpf,
                   Nome = model.Nome,
                   IdCliente = model.IdCliente,
                });
                return Json( new { Message = "Cadastro efetuado com sucesso"});
            }
        }
        [HttpPost]
        public JsonResult Listar(long IdCliente)
        {
            BoBeneficiario bo = new BoBeneficiario();
            List<Beneficiario> LstBeneficiarios = bo.Listar(IdCliente);
            List<BeneficiarioModel> LstBeneficiariosModel = null;

            if (LstBeneficiarios != null)
            {
                LstBeneficiariosModel = (from b in LstBeneficiarios
                                         select new BeneficiarioModel
                                         {
                                             Id = b.Id,
                                             Cpf = b.Cpf,
                                             Nome = b.Nome,
                                             IdCliente = b.IdCliente
                                         }).ToList();

            }

            return Json(new { Result = "OK", Records = LstBeneficiariosModel, TotalRecordCount = LstBeneficiariosModel?.Count() ?? 0 });
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.PesqBeneficiarioCPF(model.Cpf, model.IdCliente))
                {
                    Response.StatusCode = 400;
                    return Json("O CPF informado já está cadastrado como beneficiário para esse cliente.");
                }
                bo.Alterar(new Beneficiario()
                {
                    Cpf = model.Cpf,
                    Nome = model.Nome,
                    Id = model.Id,
                });
                return Json(new { Message = "Alteração efetuada com sucesso" });
            }

        }

        [HttpPost]
        public JsonResult Remover(long Id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            bo.Remover(Id);
            return Json(new { Message = "Remoção efetuada com sucesso" });
        }


    }
}