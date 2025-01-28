document.getElementById('startButton').addEventListener('click', () => {
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
});
class PlayerManager {
    constructor() {
        this.players = [];
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('playerForm').addEventListener('submit', this.addPlayer.bind(this));
        document.getElementById('sortSelect').addEventListener('change', this.sortPlayers.bind(this));
    }

    addPlayer(event) {
        event.preventDefault();

        if (this.players.length >= 10) {
            alert('Maximum of 10 players reached!');
            return;
        }

        const player = {
            id: Date.now(),
            name: document.getElementById('name').value,
            score: parseInt(document.getElementById('score').value) || 0,
            level: parseInt(document.getElementById('level').value) || 1
        };

        this.players.push(player);
        this.sortPlayersByScore(); 
        this.renderPlayerTable();
        this.animateRow(player.id); 
        event.target.reset();
    }

    renderPlayerTable() {
        const tableBody = document.getElementById('playerTableBody');
        tableBody.innerHTML = '';

        this.players.forEach((player, index) => {
            const row = document.createElement('tr');
            row.setAttribute('id', `player-${player.id}`);
            row.innerHTML = `
                <td>
                    ${player.name}
                    ${index === 0 ? '<i class="fas fa-crown"></i>' : ''}
                    ${index === 1 ? '<i class="fas fa-medal"></i>' : ''}
                    ${index === 2 ? '<i class="fas fa-award"></i>' : ''}
                </td>
                <td>${player.score}</td>
                <td>${player.level}</td>
                <td class="action-buttons">
                    <button class="delete-btn" onclick="playerManagerSystem.deletePlayer(${player.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    deletePlayer(id) {
        this.players = this.players.filter(player => player.id !== id);
        const row = document.getElementById(`player-${id}`);
        if (row) {
            row.classList.add('fade-out'); 
            setTimeout(() => {
                this.renderPlayerTable(); 
            }, 300); 
        }
    }

    sortPlayers() {
        const sortBy = document.getElementById('sortSelect').value;
        this.players.sort((a, b) => {
            if (sortBy === 'score' || sortBy === 'level') {
                return b[sortBy] - a[sortBy]; 
            } else {
                if (a[sortBy] < b[sortBy]) return -1;
                if (a[sortBy] > b[sortBy]) return 1;
                return 0;
            }
        });
        this.renderPlayerTable();
    }

    sortPlayersByScore() {
        this.players.sort((a, b) => b.score - a.score);
    }

    animateRow(playerId) {
        const row = document.getElementById(`player-${playerId}`);
        if (row) {
            row.classList.add('highlight');
            setTimeout(() => {
                row.classList.remove('highlight');
            }, 1000); 
        }
    }
}

const playerManagerSystem = new PlayerManager();
