#!/usr/bin/env node

/**
 * Script de configuração do ambiente de desenvolvimento
 * Detecta o sistema operacional e executa o script apropriado
 */

import { execSync } from 'child_process';
import { platform } from 'os';
import { existsSync } from 'fs';

const osPlatform = platform();

console.log('🚀 Configurando ambiente de desenvolvimento...\n');

// Verificar se os scripts existem
const psScript = 'scripts/dev-setup.ps1';
const shScript = 'scripts/dev-setup.sh';

if (osPlatform === 'win32') {
  if (existsSync(psScript)) {
    console.log('Executando script PowerShell...\n');
    execSync(`powershell -ExecutionPolicy Bypass -File ${psScript}`, {
      stdio: 'inherit',
    });
  } else {
    console.error('❌ Script PowerShell não encontrado!');
    process.exit(1);
  }
} else {
  if (existsSync(shScript)) {
    console.log('Executando script Bash...\n');
    execSync(`bash ${shScript}`, {
      stdio: 'inherit',
    });
  } else {
    console.error('❌ Script Bash não encontrado!');
    process.exit(1);
  }
}

