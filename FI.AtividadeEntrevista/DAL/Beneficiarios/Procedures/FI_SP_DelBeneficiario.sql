﻿CREATE PROC FI_SP_DelBeneficiario
	@Id            BIGINT
AS
BEGIN
	DELETE FROM BENEFICIARIOS 
	WHERE Id = @Id
END