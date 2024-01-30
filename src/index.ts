import {DefaultReporter} from "vitest/reporters";
import {exec} from 'child_process';
import type {File, Task} from "vitest";
import type {ErrorWithStack} from "jest-util";

const PROJECT = 'experience'

type MyError = {
  filePath: string,
  errorName: string,
  line: string | undefined,
  column: string | undefined,
  message: string
}

function sendSystemMessage(title: string, subtitle: string, message: string, url: string, icon: string, senderID: string, sound: string = 'default') {
  let command = `terminal-notifier -group ${PROJECT} -title "${title}"  -subtitle "${subtitle}" -message "${message}" -open "${url}" -appIcon "${icon}" -contentImage "${icon}" -sound ${sound}`
  exec(command)
}

/**
 * Gets the full path to the test fail icon. Checks the cwd and then appends the rest of the path
 */
function getFailIconPath() {
  return `${process.cwd()}/tools/testFail.png`
}

function constructJetBrainsLink(path: string, line: string = '0', column: string = '0'): string {
  return `webstorm://open?file=${path}&line=${line}&column=${column}`
}

// function getVitestLink(fileId: string) {
//   return `http://localhost:51204/__vitest__/#/?file=${fileId}`
// }

function extractFilename(logString : string | undefined) : string {
  if (!logString) {
    return ''
  }
  // Regular expression to match the file path
  const regex = /\/[\w\/.-]+\/[\w.-]+\.ts/;

  // Executing the regex on the given string
  const match = logString.match(regex);

  // If a match is found, return it; otherwise, return an empty string
  return match ? match[0] : '';
}


class ExtendedReporter extends DefaultReporter {
  reportTestSummary(files: File[], errors: unknown[]): Promise<void> {
    let errorReport : MyError[] = []
    files.forEach((file: File) => {
      reportTask(file, errorReport)
    })

    errorReport.forEach((error: MyError) => {
      sendSystemMessage('Experience Test Failed',
        error.message,
        `${error.filePath}:${error.line}:${error.column}`,
        constructJetBrainsLink(error.filePath, error.line, error.column),
        getFailIconPath(),
        'com.jetbrains.WebStorm'
      )
    })

    return super.reportTestSummary(files as any, errors)
  }
}

function reportTask(task: File | Task, accumulator: MyError[]): MyError[] {
  if (task?.result?.state == 'fail') {
    if (task.type === 'suite') {
      if (task.tasks) {
        task.tasks.forEach((task: Task) => {
          reportTask(task, accumulator)
        })
      }
    } else {
      if (task?.result?.errors) {
        task.result.errors.forEach((error: ErrorWithStack) => {
          // console.log(error)
          accumulator.push({
            filePath: extractFilename(error.stack),
            errorName: error.name,
            line: error?.stack?.split('\n')[1]?.split(':')[1],
            column: error?.stack?.split('\n')[1]?.split(':')[2],
            message: error.message
          })
        })
      }
    }
  }
  return accumulator;
}

export {ExtendedReporter}