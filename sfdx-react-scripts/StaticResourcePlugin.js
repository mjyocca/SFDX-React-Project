const StaticResourceFile = require('./StaticResourceFile')

class CreateStaticMetaFile {

    apply(compiler){
        compiler.hooks.afterEmit.tap("Static Resource Meta File Create", (compilation) => {
            const { chunks } = compilation;
            chunks.forEach(chunk => {
                StaticResourceFile(chunk.name)
            })
        })
    }

}

module.exports = CreateStaticMetaFile;