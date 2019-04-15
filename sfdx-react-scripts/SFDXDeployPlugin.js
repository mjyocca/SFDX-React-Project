const deploy = require('./deploy')

class SFDXDeployPlugin {

    apply(compiler){
        compiler.hooks.done.tapAsync("SFDX Deploy", (compilation, callback) => {
            const { chunks } = compilation.compilation;
            const entries = chunks.map((chunk) => ({ name: chunk.name }))
            deploy(entries)
            callback()
        })
    }
}

module.exports = SFDXDeployPlugin;