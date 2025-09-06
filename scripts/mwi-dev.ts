#!/usr/bin/env bun
/**
 * MWI Types Development CLI - Bun-First Edition
 * Unified development tooling for generator development using native Bun APIs
 */

// ANSI colors for better CLI output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

const log = {
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warn: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  header: (msg: string) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
}

async function runCommand(command: string, description?: string): Promise<string> {
  if (description) {
    log.info(description)
  }
  try {
    // Use shell execution to properly handle quoted commands with pipes
    const proc = Bun.spawn(['sh', '-c', command], {
      stdout: 'pipe',
      stderr: 'pipe',
    })
    const output = await new Response(proc.stdout).text()
    const exitCode = await proc.exited
    
    if (exitCode !== 0) {
      const error = await new Response(proc.stderr).text()
      throw new Error(`Exit code ${exitCode}: ${error}`)
    }
    
    console.log(output)
    return output
  } catch (error) {
    log.error(`Command failed: ${command}`)
    log.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

function showUsage() {
  console.log(`
${colors.bright}${colors.cyan}MWI Types Development CLI - Bun Edition${colors.reset}

${colors.bright}ANALYSIS COMMANDS:${colors.reset}
  analyze:source <ENTITY>     Analyze entity in game_data.json
  explore:entity <ENTITY>     Deep dive into entity structure
  analyze:generator <MODULE>  Analyze generator configuration
  analyze:generated <MODULE>  Inspect generated files

${colors.bright}GENERATOR COMMANDS:${colors.reset}
  scaffold:generator <MODULE> Create generator folder structure
  generate:single <MODULE>    Generate only specified module
  validate:generator <MODULE> Complete generator health check
  debug:generator <MODULE>    Debug generator issues

${colors.bright}TESTING COMMANDS:${colors.reset}
  test:generator <MODULE>     Run generator tests
  test:treeshaking <MODULE>   Test tree-shaking compatibility

${colors.bright}INVESTIGATION COMMANDS:${colors.reset}
  investigate:entity <ENTITY> <MODULE>  Log investigation for manual review

${colors.bright}EXAMPLES:${colors.reset}
  bun scripts/mwi-dev.ts analyze:source skillDetailMap
  bun scripts/mwi-dev.ts generate:single skills
  bun scripts/mwi-dev.ts validate:generator actions
  bun scripts/mwi-dev.ts investigate:entity skillDetailMap skills
`)
}

function validateArgs(requiredCount: number, args: string[], commandName: string) {
  if (args.length < requiredCount) {
    log.error(`${commandName} requires ${requiredCount} argument${requiredCount > 1 ? 's' : ''}`)
    showUsage()
    process.exit(1)
  }
}

async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    showUsage()
    return
  }

  const command = args[0]
  const params = args.slice(1)

  switch (command) {
    // === ANALYSIS COMMANDS ===
    case 'analyze:source': {
      validateArgs(1, params, 'analyze:source')
      const entity = params[0]
      log.header(`Analyzing ${entity}`)
      
      console.log('Entity count:')
      await runCommand(`/usr/bin/jq '.${entity} | length' src/sources/game_data.json`)
      console.log('\nSample keys:')
      await runCommand(`/usr/bin/jq '.${entity} | to_entries[0].value | keys[0:10]' src/sources/game_data.json`)
      break
    }

    case 'explore:entity': {
      validateArgs(1, params, 'explore:entity')
      const entity = params[0]
      log.header(`Deep dive: ${entity}`)
      
      console.log('Total entities:')
      await runCommand(`/usr/bin/jq '.${entity} | length' src/sources/game_data.json`)
      
      console.log('\nSample entity:')
      await runCommand(`/usr/bin/jq '.${entity} | to_entries[0].value' src/sources/game_data.json`)
      
      console.log('\nAll properties in sample:')
      await runCommand(`/usr/bin/jq '.${entity} | to_entries[0].value | keys' src/sources/game_data.json`)
      break
    }

    case 'analyze:generator': {
      validateArgs(1, params, 'analyze:generator')
      const module = params[0]
      log.header(`Analyzing ${module} generator`)
      
      const generatorPath = `src/generation/generators/${module}/generator.ts`
      const generatorFile = Bun.file(generatorPath)
      if (!(await generatorFile.exists())) {
        log.error(`Generator not found: ${generatorPath}`)
        return
      }
      
      console.log('Source Key:')
      await runCommand(`grep -o 'sourceKey: [^,]*' ${generatorPath} || echo 'Not found'`)
      
      console.log('\nShared Types:')
      await runCommand(`grep -A 5 'sharedTypes:' ${generatorPath} | head -6 || echo 'Not found'`)
      
      console.log('\nTemplates:')
      await runCommand(`grep -A 10 'utilityTemplates:' ${generatorPath} | head -11 || echo 'Not found'`)
      break
    }

    case 'analyze:generated': {
      validateArgs(1, params, 'analyze:generated')
      const module = params[0]
      log.header(`Generated ${module} analysis`)
      
      const genPath = `src/generated/${module}/`
      const genDir = Bun.file(genPath)
      if (!(await genDir.exists())) {
        log.error(`Generated module not found: ${genPath}`)
        return
      }
      
      await runCommand(`ls -la ${genPath}`)
      
      console.log('\nTypes file preview:')
      await runCommand(`head -20 ${genPath}types.ts 2>/dev/null || echo 'No types file'`)
      
      console.log('\nUtils file size:')
      await runCommand(`wc -l ${genPath}utils.ts 2>/dev/null || echo 'No utils file'`)
      
      console.log('\nConstants count:')
      await runCommand(`grep -c 'export const' ${genPath}constants.ts 2>/dev/null || echo 'No constants file'`)
      break
    }

    // === GENERATOR COMMANDS ===
    case 'scaffold:generator': {
      validateArgs(1, params, 'scaffold:generator')
      const module = params[0]
      const generatorDir = `src/generation/generators/${module}`
      
      const dirFile = Bun.file(generatorDir)
      if (await dirFile.exists()) {
        log.warn(`Generator directory already exists: ${generatorDir}`)
      } else {
        await Bun.write(`${generatorDir}/generator.ts`, '// TODO: Create generator\n')
        await Bun.write(`${generatorDir}/generator.test.ts`, '// TODO: Create tests\n')
        await Bun.write(`${generatorDir}/README.md`, `# ${module} Generator\n\nTODO: Document generator\n`)
        log.success(`Generator scaffolded at ${generatorDir}/`)
      }
      
      console.log('Next: Create generator.ts, generator.test.ts, and README.md')
      break
    }

    case 'generate:single': {
      validateArgs(1, params, 'generate:single')
      const module = params[0]
      log.header(`Generating ${module} module`)
      
      const generatorPath = `src/generation/generators/${module}/generator.ts`
      const generatorFile = Bun.file(generatorPath)
      if (!(await generatorFile.exists())) {
        log.error(`Generator not found: ${generatorPath}`)
        return
      }
      
      await runCommand(`bun run ${generatorPath}`, `Running ${module} generator`)
      log.success(`${module} module generated successfully`)
      break
    }

    case 'validate:generator': {
      validateArgs(1, params, 'validate:generator')
      const module = params[0]
      log.header(`Validating ${module} generator`)
      
      const generatorPath = `src/generation/generators/${module}/generator.ts`
      const generatorFile = Bun.file(generatorPath)
      if (!(await generatorFile.exists())) {
        log.error(`Generator not found: ${generatorPath}`)
        return
      }
      
      // Run tests with Bun
      await runCommand(`bun test src/generation/generators/${module}/generator.test.ts`, 'Running tests...')
      
      // Type check generator
      await runCommand(`bun tsc --noEmit --skipLibCheck ${generatorPath}`, 'Type checking generator...')
      
      log.success(`${module} generator validated!`)
      break
    }

    case 'debug:generator': {
      validateArgs(1, params, 'debug:generator')
      const module = params[0]
      log.header(`Debugging ${module} generator`)
      
      // Run analysis first
      await runCommand(`bun scripts/mwi-dev.ts analyze:generator ${module}`)
      
      console.log('\nRunning tests with detailed output:')
      await runCommand(`bun test src/generation/generators/${module}/generator.test.ts --verbose`)
      break
    }

    // === TESTING COMMANDS ===
    case 'test:generator': {
      validateArgs(1, params, 'test:generator')
      const module = params[0]
      log.header(`Testing ${module} generator`)
      
      await runCommand(`bun test src/generation/generators/${module}/generator.test.ts`)
      break
    }

    case 'test:treeshaking': {
      validateArgs(1, params, 'test:treeshaking')
      const module = params[0]
      log.header(`Testing tree-shaking for ${module}`)
      
      // Create test import
      const testImport = `import { getAll${module?.charAt(0).toUpperCase()}${module?.slice(1)} } from './src/generated/${module}/utils'`
      await Bun.write('test-treeshake.js', testImport)
      
      // Test bundle
      await runCommand('bun build test-treeshake.js --outdir=test-build --minify')
      
      console.log('\nBundle size:')
      await runCommand('ls -lh test-build/*.js')
      
      // Cleanup
      await runCommand('rm -rf test-build test-treeshake.js')
      log.success('Tree-shaking test complete')
      break
    }

    // === INVESTIGATION COMMANDS ===
    case 'investigate:entity': {
      validateArgs(2, params, 'investigate:entity')
      const entity = params[0]
      const module = params[1]
      
      log.header(`Logging investigation: ${module}`)
      
      const logFile = 'INVESTIGATION_LOG.md'
      let logContent = `## Investigation Needed: ${module}\n`
      logContent += `- Entity: ${entity}\n`
      logContent += `- Date: ${new Date().toString()}\n`
      logContent += `- Source data analysis:\n\`\`\`\n`
      
      const output = await runCommand(`bun scripts/mwi-dev.ts explore:entity ${entity}`, 'Getting entity analysis...')
      logContent += output
      logContent += `\`\`\`\n`
      logContent += `- Questions/Concerns: [TO BE FILLED]\n\n`
      
      // Check if file exists and append, or create new
      const existingFile = Bun.file(logFile)
      const existingContent = (await existingFile.exists()) ? await existingFile.text() : ''
      await Bun.write(logFile, existingContent + logContent)
      
      log.success('Investigation logged to INVESTIGATION_LOG.md')
      console.log('Please review and add your questions/concerns to the file.')
      break
    }

    default:
      log.error(`Unknown command: ${command}`)
      showUsage()
      process.exit(1)
  }
}

main().catch((error) => {
  log.error(`CLI error: ${error.message}`)
  process.exit(1)
})
