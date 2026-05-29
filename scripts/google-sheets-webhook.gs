/**
 * Grupo Ana Melo — Webhook para Google Planilhas
 *
 * Como usar:
 * 1. Crie uma planilha em https://sheets.google.com
 * 2. Na primeira linha, adicione os cabeçalhos:
 *    Data | Nome completo | Cidade | Telefone | Mensagem
 * 3. Extensões → Apps Script → cole este arquivo
 * 4. Em SCRIPT_SECRET abaixo, defina uma senha longa (mesma do .env)
 * 5. Implantar → Nova implantação → Tipo: App da Web
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 6. Copie a URL que termina em /exec para BENEFICIARIA_GOOGLE_SCRIPT_URL
 */

// DEVE ser idêntica à variável BENEFICIARIA_GOOGLE_SCRIPT_SECRET no .env.local
const SCRIPT_SECRET = "troque-por-uma-senha-longa-e-secreta"

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)

    if (body.secret !== SCRIPT_SECRET) {
      return jsonResponse({ error: "Não autorizado" }, 401)
    }

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Cadastros") ||
      SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    sheet.appendRow([
      new Date(),
      body.nomeCompleto || "",
      body.cidade || "",
      body.telefone || "",
      body.mensagem || "",
    ])

    return jsonResponse({ success: true })
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      500,
    )
  }
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  )

  if (statusCode) {
    // Apps Script não expõe status HTTP diretamente; o cliente valida o JSON.
    return output
  }

  return output
}
