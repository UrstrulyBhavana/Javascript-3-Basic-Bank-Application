// Define initial account balances
let accounts = {
    "1": {
        "balance": 100,
        "transactions": []
    },
    "2": {
        "balance": 50,
        "transactions": []
    }
 };
 // Define transfer function
 function transferMoney(fromAccount, toAccount, amount) {
    // Check if both accounts exist
    if (accounts.hasOwnProperty(fromAccount) && accounts.hasOwnProperty(toAccount)) {
        // Check if from account has enough balance
        if (accounts[fromAccount].balance >= amount) {
            // Update account balances
            accounts[fromAccount].balance -= amount;
            accounts[toAccount].balance += amount;
            // Add transaction to both accounts
            const transaction = {
                "from": fromAccount,
                "to": toAccount,
                "amount": amount
            };
            accounts[fromAccount].transactions.push(transaction);
            accounts[toAccount].transactions.push(transaction);
            // Update transaction history display
            updateTransactionHistory();
            // Show success message
            alert("Transfer successful!");
            // Reset form
            document.getElementById("transfer-form").reset();
        } else {
            alert("Insufficient balance!");
        }
    } else {
        alert("Invalid account selection!");
    }
 }
 // Define transaction history update function
 function updateTransactionHistory() {
    // Loop through all accounts
    for (let account in accounts) {
        if (accounts.hasOwnProperty(account)) {
            const transactionsList = document.getElementById(`account-${account}-transactions`);
            // Clear existing transaction history
            transactionsList.innerHTML = `<li>Initial Balance: $${accounts[account].balance}</li>`;
            // Loop through all transactions for the account and add to the list
            accounts[account].transactions.forEach(transaction => {
                let transactionType = "";
                let transactionAmount = "";
                if (transaction.from === account) {
                    transactionType = "Sent";
                    transactionAmount = `-$${transaction.amount}`;
                } else {
                    transactionType = "Received";
                    transactionAmount = `+$${transaction.amount}`;
                }
                const transactionEntry = document.createElement("li");
                transactionEntry.innerText = `${transactionType} ${transactionAmount}`;
                transactionsList.appendChild(transactionEntry);
            });
        }
    }
 }
 // Define form submission handler
 const form = document.getElementById("transfer-form");
 form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fromAccount = form.elements["from-account"].value;
    const toAccount = form.elements["to-account"].value;
    const amount = parseInt(form.elements["amount"].value);
    transferMoney(fromAccount, toAccount, amount);
 });
 // Initial transaction history display
 updateTransactionHistory();