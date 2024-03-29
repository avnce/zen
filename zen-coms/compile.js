import {exec} from "child_process"
import * as fs from 'fs-extra'
import * as d_pkg_m from 'detect-package-manager'
import {platform} from "process"

const isVercelBuild = process.argv.includes("--vercel");
const package_manager = await d_pkg_m.detect()

console.clear()
console.log("Zen Compiler v1")
console.log(`©${new Date().getFullYear()} avnce. This project is open-source.\n`)
console.log(`Your package manager is ${package_manager}`)
console.log(`The platform that you are on is ${platform}`)
console.log("You are currently building ZEN-BASE.\n\n")
if (isVercelBuild == true) {
    console.log("[*] Beginning Vercel Compilation.")
    console.log("[*] Moving addons folder to the appropriate location.")
    fs.copy('addons/','static/addons/', {recursive: true})    
}
if (package_manager == 'pnpm') {
    fs.remove('build/', (error) => {
        if (error) return console.error(error)
    });
    console.log("[*] Currently Building")
    await exec('pnpm run build', function() {
        if (isVercelBuild != true) {
            console.log("[*] Moving addons folder.")
            fs.copy('addons/','build/client/addons', {recursive: true})
        } else {
            console.log("[*] Deleting addons folder after finished with compilation.")
            fs.remove('static/addons/',(error) => {
                if (error) return console.error(error)
            });
        }    
        console.log('[*] Compilation done!')
        console.log('Welcome to Zen.')
    })
}
if (package_manager == 'npm') {
    fs.remove('build/', (error) => {
        if (error) return console.error(error)
    });
    console.log("[*] Currently Building")
    await exec('npm run build', function() {
        if (isVercelBuild != true) {
            console.log("[*] Moving addons folder.")
            fs.copy('addons/','build/client/addons', {recursive: true})
        } else {
            console.log("[*] Deleting addons folder after finished with compilation.")
            fs.remove('static/addons/',(error) => {
                if (error) return console.error(error)
            });
        }
    })
}