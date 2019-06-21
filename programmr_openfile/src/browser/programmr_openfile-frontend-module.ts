/**
 * Generated using theia-extension-generator
 */

import { Programmr_openfileCommandContribution } from './programmr_openfile-contribution';
import {FrontendApplicationContribution  } from "@theia/core/lib/browser";


import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(FrontendApplicationContribution).to(Programmr_openfileCommandContribution);
    
});