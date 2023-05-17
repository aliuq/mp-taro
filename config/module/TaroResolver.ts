import fs from 'node:fs'
import path from 'node:path'
import { resolveModule } from 'local-pkg'
import type { ImportNameAlias, ImportsMap } from 'unplugin-auto-import/types'
import { reservedKeywords } from './keywords'

const cachePath = './config/module/taro-apis.json'

// generateApis()
function generateApis() {
  const exclude = [
    'fail', 'success', 'complete', 'reject', 'resolve',
    ...reservedKeywords,
  ]
  const conflicts: Record<string, string> = {
    nextTick: 'taroNextTick',
    getCurrentInstance: 'taroGetCurrentInstance',
  }

  const dir = resolveModule('@tarojs/taro')
  if (!dir) {
    console.error('\n[auto-import] Not found package `@tarojs/taro`, have you installed it?')
    console.error('see more https://github.com/NervJS/taro')
    return
  }

  try {
    const typesDir = `${path.dirname(dir) + path.sep}types`
    let maps: Array<string | ImportNameAlias> = []

    const filesList: string[] = readFiles(typesDir)

    for (const file of filesList) {
      if (file.includes('taro.extend.d.ts'))
        continue

      const pContent = fs.readFileSync(file, 'utf-8')
      const match = pContent.match(/(interface TaroStatic \{(.|\n)*\})/) || []
      const content = match[0]
      const reg = /(?<=\s{4})(?<name>\w+)(?=(\s?\()|\<)/g

      if (!content)
        continue

      const funcs: Array<string | [string, string]> = (content.match(reg) || [])
        .filter(fun => !exclude.includes(fun))
        .map((fun: string) => conflicts[fun] ? [fun, conflicts[fun]] : fun)

      maps = maps.concat(funcs)
    }

    maps = [
      'getEnv',
      ['getCurrentInstance', 'taroGetCurrentInstance'],
      ...Array.from(new Set(maps)),
    ] as ImportNameAlias[]

    // fs.writeFileSync('./config/module/taro-apis.json', JSON.stringify(maps, null, 2))
    return maps
  }
  catch (err: any) {
    console.error(
      'Some errors have occurred, '
      + 'please report an issue at https://github.com/antfu/unplugin-auto-import/issues/new?'
       + `title=${encodeURIComponent('[Taro] Failed generate apis')}&body=${encodeURIComponent(err?.message)}`,
    )
    console.error(err)
  }
}

function readFiles(dir: string, filesList: string[] = []) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.resolve(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory())
      readFiles(filePath, filesList)

    else
      filesList.push(filePath)
  }

  return filesList
}

export default function (): ImportsMap {
  let jsonAPIs: (string | ImportNameAlias)[] = []
  if (fs.existsSync(cachePath)) {
    jsonAPIs = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }
  else {
    jsonAPIs = generateApis() || []
    jsonAPIs.length && fs.writeFileSync(cachePath, JSON.stringify(jsonAPIs, null, 2))
  }

  return {
    '@tarojs/taro': jsonAPIs,
  }
}
