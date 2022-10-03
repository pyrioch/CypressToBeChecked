# CypressToBeChecked

Cypress cy.js spec files for UI testing

Σύντομη περιγραφή των files που περιέχονται :

1. "Functions4HBC" , συγκεντρωτικό αρχείο με όλες τις συναρτήσεις που χρησιμοποιήθηκαν στο "HbcSecondTest".
2. "Functions4Homepage", συγκεντρωτικό αρχείο με όλες τις συναρτήσεις που χρησιμοποιήθηκαν στο "homepage".

3.Test που περιέχονται στο Homepage: 
3.1Test "navtoHomePage", τσεκάρει όλα τα link του footer και του hrader. 
3.2Test Carreers , στο αντόστοιχο route checks oti "paizei" to accordion
3.3ForgotPassword, στο αντόστοιχο route checks oti on submit , εμφανίζεται network error.
3.4"Visit all routes one by one, checks all routes to have valid location".
3.5"Visit only the routes that contain lOgin form elements and type random text into them" , self explanatory. 

4. Test poy periexontai sto HbcSecondTest:
4.1 FE/UI check , γενικός έλεγχος ότι δεν έχει σπάσει κάτι στο FE του Homepage. 
4.2 InterestformCheck , γεμίζει τα πεδία της φόρμας με randomised text kai asserts ότι εμφανίζεται "?" στο route.
