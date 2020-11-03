/*
import * as theia from '@theia/plugin';
import AxiosInstance from 'axios';

export function start(context: theia.PluginContext) {



    const workspacePlugin = theia.plugins.getPlugin('Eclipse Che.@eclipse-che/workspace-plugin');
            if (workspacePlugin) {
                workspacePlugin.exports.onDidCloneSources(() => handleReadmeFiles());
            } else {
                handleReadmeFiles();
            }

         }
    }
     const workspaceFolders = theia.workspace.workspaceFolders;
    theia.window.showInformationMessage('workspaceFolders =' + JSON.stringify(workspaceFolders));

    let workspacePaths: string[] = [];
    if (workspaceFolders) {
        workspacePaths = workspaceFolders.map(workspaceFolder => {
            return workspaceFolder.uri.path;
        })
    }

    const languagesPerInstalledPlugins = new Map<string, string[]>();

    // grab all activated plugins
    theia.plugins.all.forEach(plugin => {
        const activationEvents: string[] = plugin.packageJSON.activationEvents || [];
        activationEvents.forEach(activationEvent => {
            if (activationEvent.startsWith('onLanguage:')) {
                const languageID = activationEvent.substring('onLanguage:'.length);
                let existingPlugins = languagesPerInstalledPlugins.get(languageID);
                if (!existingPlugins) {
                    existingPlugins = [];
                    languagesPerInstalledPlugins.set(languageID, existingPlugins);
                }
                if (!existingPlugins.includes(plugin.id)) {
                    existingPlugins.push(plugin.id);
                }
            }
        })
    });

    const languagesPerRemoteAvailablePlugins = new Map<string, any[]>();



    const listener1 = async (textDocument: theia.TextDocument) => {
         if (workspacePaths.some(workspacePath => textDocument.fileName.startsWith(workspacePath))) {
            theia.window.showInformationMessage(`${textDocument.fileName} startsWith`);

            const languageID = textDocument.languageId;

            const installedPlugins = languagesPerInstalledPlugins.get(languageID);
            if (!installedPlugins) {

                let remoteAvailablePlugins= languagesPerRemoteAvailablePlugins.get(languageID);
                if (!remoteAvailablePlugins) {
                    // need to fetch
                    try {
                        const response = await AxiosInstance.get(`http://localhost:8080/v3/recommandations/featured/${languageID}.json`);
                        theia.window.showInformationMessage(`remote content updated to ${response.data}`);
                        remoteAvailablePlugins = response.data.ids;
                       catch (error) {
                        remoteAvailablePlugins = [];
                        theia.window.showInformationMessage(`error  ${error}`);
                    }
                    theia.window.showInformationMessage(`remote content updated to ${remoteAvailablePlugins}`);
                    remoteAvailablePlugins!.map(pluginCategory => {
                        if (pluginCategory.category === 'Programming Languages') {
                            theia.window.showInformationMessage(`Recommended extension for ${languageID} are ${pluginCategory.ids}`);
                        }

                        /// The Marketplace has extensions that can help with '.COBOL' files
                        // Search Marketplace
                        // Don't Show again for '.COBOL' files

                        // Do you want to install the recommended extensions for Python?
                        //Install
                        // Show Recommendations

                    })


                }

                theia.window.showInformationMessage('Picking up listener1 ' + textDocument.fileName + ' is using language ' + textDocument.languageId);
                theia.window.showInformationMessage(`found remote plugins ${remoteAvailablePlugins} for language ${languageID}`);
            } else {

                theia.window.showInformationMessage(`There are already plug-ins for language ${languageID}. These are ${installedPlugins}`);
            }
        }
    }

    theia.workspace.onDidOpenTextDocument(listener1)

}

export function stop() {

}
*/