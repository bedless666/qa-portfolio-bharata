/**
 * Data processing and validation functions
 */

function getSheetData() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    .getSheetByName(CONFIG.SHEET_NAME);
  
  Logger.log("=== START EXECUTION ===");
  
  // Mencari posisi header "RN Live Regression QA"
  const scheduleRange = sheet.createTextFinder("RN Live Regression QA").findNext();
  if (!scheduleRange) {
    Logger.log("❌ Schedule header not found");
    return null;
  }
  
  Logger.log(`✅ Header found at row: ${scheduleRange.getRow()}`);
  
  // Ambil data mulai dari 3 baris setelah header
  const startRow = scheduleRange.getRow() + 3;
  const lastRow = sheet.getLastRow();
  const numRows = lastRow - startRow + 1;
  
  Logger.log(`Start Row: ${startRow}`);
  Logger.log(`Last Row: ${lastRow}`);
  Logger.log(`Number of Rows to check: ${numRows}`);
  
  const data = sheet.getRange(startRow, 1, numRows, 6).getValues();
  
  return { data, startRow };
}

function validateAndProcessData(data, startRow) {
  Logger.log("\n=== VALIDATING DATA ===");
  
  const validSchedule = [];
  const allQAEmails = new Set();
  let skippedEmptyRow = 0;
  let skippedMissingField = 0;
  let skippedInvalidStatus = 0;
  
  data.forEach((row, index) => {
    const week = row[0];
    const month = row[1];
    const version = row[2];
    const subteam = row[3];
    const assignedQA = row[4];
    const status = row[5];
    
    // Skip jika baris kosong atau header
    if (!row.some(cell => cell !== "") || 
        week === "Week" || 
        typeof week === "string" && week.includes("RN Live Regression")) {
      skippedEmptyRow++;
      return;
    }
    
    Logger.log(`\n--- Row ${startRow + index} ---`);
    Logger.log(`Week: "${week}" | Month: "${month}" | Version: "${version}"`);
    Logger.log(`Subteam: "${subteam}" | QA: "${assignedQA}" | Status: "${status}"`);
    
    // Validasi: Week, Month, Version, Subteam, Status wajib terisi
    if (!week || !month || !version || !subteam || !status) {
      Logger.log(`  ❌ Skipped: Missing required field(s):`);
      Logger.log(`     Week: ${!!week}, Month: ${!!month}, Version: ${!!version}`);
      Logger.log(`     Subteam: ${!!subteam}, Status: ${!!status}`);
      skippedMissingField++;
      return;
    }
    
    // Validasi status
    const statusLower = status.toString().toLowerCase().trim();
    const isValidStatus = statusLower.includes('pending') || statusLower.includes('not started');
    const isCompleted = statusLower.includes('complete');
    
    if (!isValidStatus || isCompleted) {
      Logger.log(`  ❌ Skipped: Invalid status ("${status}")`);
      skippedInvalidStatus++;
      return;
    }
    
    // Jika lolos validasi
    const isQAAssigned = !!assignedQA;
    
    if (isQAAssigned) {
      allQAEmails.add(assignedQA);
    }
    
    Logger.log(`  ✅ VALID: Added to schedule ${isQAAssigned ? '' : '(QA NOT ASSIGNED - WARNING)'}`);
    
    validSchedule.push({
      week: week,
      month: month,
      version: version,
      subteam: subteam,
      qaName: isQAAssigned ? (typeof assignedQA === 'string' ? assignedQA.split('@')[0] : assignedQA) : null,
      qaEmail: isQAAssigned ? assignedQA : null,
      status: status,
      originalIndex: index,
      isQAAssigned: isQAAssigned
    });
  });
  
  Logger.log("\n=== VALIDATION SUMMARY ===");
  Logger.log(`Total rows checked: ${data.length}`);
  Logger.log(`Skipped (empty/header): ${skippedEmptyRow}`);
  Logger.log(`Skipped (missing field): ${skippedMissingField}`);
  Logger.log(`Skipped (invalid status): ${skippedInvalidStatus}`);
  Logger.log(`Valid schedule items: ${validSchedule.length}`);
  Logger.log(`Total unique QAs: ${allQAEmails.size}`);
  
  return { validSchedule, allQAEmails };
}

