#!/bin/bash

cat .readme-intro.md  > README.md
sed '1,5d' fab4m.org/docs/intro.md >> README.md
sed -i "s|guide/|https://fab4m.org/guide/|g" README.md

# Core readme.
cat README.md > packages/core/README.md
cat .readme-license.md >> packages/core/README.md
cp LICENSE packages/core/.

# Add outro to readme.
cat .readme-outro.md >> README.md
cat .readme-license.md >> README.md

# Date readme.
node bin/example-to-md.js fab4m.org/docs/packages/date.md packages/date/README.md
sed -i '1,16d' packages/date/README.md
sed -i 's|Date and time|@fab4m/date|g' packages/date/README.md
cat .readme-license.md >> packages/date/README.md
cp LICENSE packages/date/.

# Password readme
node bin/example-to-md.js fab4m.org/docs/packages/password.md packages/password/README.md
sed -i '1,9d' packages/password/README.md
sed -i 's|Password|@fab4m/password|g' packages/password/README.md
cat .readme-license.md >> packages/password/README.md
cp LICENSE packages/password/.

# Route readme
node bin/example-to-md.js fab4m.org/docs/packages/routerforms.md packages/routerforms/README.md
sed -i '1,5d' packages/routerforms/README.md
sed -i 's|Router forms|@fab4m/routerforms|g' packages/routerforms/README.md
cat .readme-license.md >> packages/routerforms/README.md
cp LICENSE packages/routerforms/.

# Autocomplete readme
node bin/example-to-md.js fab4m.org/docs/packages/autocomplete.mdx packages/autocomplete/README.md
sed -i '1,7d' packages/autocomplete/README.md
sed -i 's|Autocomplete|@fab4m/autocomplete|g' packages/autocomplete/README.md
cat .readme-license.md >> packages/autocomplete/README.md
cp LICENSE packages/autocomplete/.

# Builder readme
node bin/example-to-md.js fab4m.org/docs/packages/formbuilder.mdx packages/builder/README.md
sed -i '1,13d' packages/builder/README.md
sed -i 's|Builder|@fab4m/builder|g' packages/builder/README.md
cat .gpl-license.md >> packages/builder/README.md
