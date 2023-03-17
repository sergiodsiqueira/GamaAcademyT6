const db = require("../config/database");

//Listar Qtde. Atendimentos por Mês Anual  ---------------------------------------------------------
exports.graficoQtdeAtendimentoPorMes = async (req, res) => {
    const pAno = parseInt(req.params.ano);
    
    var sSQL = '';
    sSQL += "SELECT Y.numero, Y.mes, A.qtd FROM ano Y LEFT JOIN";
    sSQL += " (SELECT Extract('Month' From DATA) AS mes, COUNT(*) qtd FROM atendimentos WHERE Extract('Year' From DATA) = $1 GROUP BY Extract('Month' From DATA) ORDER BY mes) A";
    sSQL += " ON Y.numero = A.mes";    
    
    const response = await db.query(sSQL, [pAno]);

    if (response.rowCount > 0){
        res.status(200).send(response.rows);
    } else {
        res.status(404).send('Este ano não teve atendimento');
    }
};