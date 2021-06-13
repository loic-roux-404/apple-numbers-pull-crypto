export const run = command => {
    const app = Application.currentApplication();
    app.includeStandardAdditions = true;

    return app.doShellScript(command)
}

export const getEnv = key => {
    try {
        run('source .env')
        return run(`echo $${key}`)
    } catch(e) {
        throw new Error(`impossible to get env ${key}`)
    }
}
