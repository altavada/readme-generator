const inquirer = require('inquirer');
const fs = require('fs');
// Array of licenses and associated badge icons
const licenses = [
    {name: 'Apache 2.0 License', badge: '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'},
    {name: 'Boost Software License 1.0', badge: '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'},
    {name: 'BSD 3-Clause License', badge: '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'},
    {name: 'BSD 2-Clause License', badge: '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'},
    {name: 'CC0', badge: '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)'},
    {name: 'Attribution 4.0 International', badge: '[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)'},
    {name: 'Attribution-ShareAlike 4.0 International', badge: '[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)'},
    {name: 'Attribution-NonCommercial 4.0 International', badge: '[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)'},
    {name: 'Attribution-NoDerivates 4.0 International', badge: '[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)'},
    {name: 'Attribution-NonCommmercial-ShareAlike 4.0 International', badge: '[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)'},
    {name: 'Attribution-NonCommercial-NoDerivatives 4.0 International', badge: '[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)'},
    {name: 'Eclipse Public License 1.0', badge: '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'},
    {name: 'GNU GPL v3', badge: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'},
    {name: 'GNU GPL v2', badge: '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)'},
    {name: 'GNU AGPL v3', badge: '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)'},
    {name: 'GNU LGPL v3', badge: '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)'},
    {name: 'GNU FDL v1.3', badge: '[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)'},
    {name: 'The Hippocratic License 2.1', badge: '[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)'},
    {name: 'The Hippocratic License 3.0', badge: '[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)'},
    {name: 'IBM Public License Version 1.0', badge: '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)'},
    {name: 'ISC License (ISC)', badge: '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'},
    {name: 'The MIT License', badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'},
    {name: 'Mozilla Public License 2.0', badge: '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'},
    {name: 'Attribution License (BY)', badge: '[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)'},
    {name: 'Open Database License (ODbL)', badge: '[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)'},
    {name: 'Public Domain Dedication and License (PDDL)', badge: '[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)'},
    {name: 'The Perl License', badge: '[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)'},
    {name: 'The Artistic License 2.0', badge: '[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)'},
    {name: 'SIL Open Font License 1.1', badge: '[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)'},
    {name: 'The Unlicense', badge: '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'},
    {name: 'The Do What the Fuck You Want to Public License', badge: '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)'},
    {name: 'The zlib/libpng License', badge: '[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)'},
    {name: 'Other', badge:''}
]
// Stores just license names in separate array
let licenseNames = [];
for(const i in licenses) {
    licenseNames.push(licenses[i].name);
}
// Prompts
inquirer
  .prompt([
    {
        type: 'input',
        message: 'Enter project title here:',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Enter project description here:',
        name: 'desc',
    },
    {
        type: 'input',
        message: 'Enter installation instructions here:',
        name: 'install',
    },
    {
        type: 'input',
        message: 'Enter usage instructions here:',
        name: 'usage',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Select the license your project uses:',
        choices: licenseNames,
    },
    {
        type: 'input',
        message: 'Enter contributor info here:',
        name: 'contr',
    },
    {
        type: 'input',
        message: 'Enter your GitHub username here:',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Enter your email address here:',
        name: 'email',
    }
  ])
  // Creating README with prompt inputs
  .then((response) => {
    let badge;
    let toc = '## Table of Contents\n1. [Installation](#installation)\n2. [Usage](#usage)\n3. [License](#license)\n4. [Contributors](#contributors)\n5. [Questions](#questions)';
    // Matches selected license name with badge icon
    for(const i of licenses) {
        if(i.name == response.license) {
            badge = i.badge;
        }
    }
    // Creates file and adds content
    fs.writeFile('./output/README.md',
        `# ${response.title}\n${badge}\n# Description\n${response.desc}\n${toc}\n# Installation\n${response.install}\n# Usage\n${response.usage}\n# License\n${response.license}\n# Contributors\n${response.contr}\n# Questions\nGitHub username: ${response.github} -- Email address: ${response.email}`,
        (err) => err ? console.log(err) : null);
    console.log('Program complete.');
  })