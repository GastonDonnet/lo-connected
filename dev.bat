start cmd /k "cd .\server && npm run dev"
start cmd /k "cd .\client && npm run serve"
TIMEOUT 10
start cmd /k "cd .\admin && npm run serve"
