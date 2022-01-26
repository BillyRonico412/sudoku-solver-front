const serverURL = "localhost:3000"

const SudokuSolver = {
    data() {
        return {
            tableau: [],
            dark: true,
            pointeur: null
        }
    },
    methods: {
        changeMode() {
            this.dark = !this.dark
            if (this.dark) document.querySelector("html").classList.add("dark")
            else document.querySelector("html").classList.remove("dark")
        },
        colorTd(x, y) {
            return {
                'bg-grille-1 dark:bg-dark-grille-1': (
                    (Math.floor((x - 1) / 3) % 2) + (Math.floor((y - 1) / 3) % 2)
                ) % 2 === 0 && this.calculIndex(x, y) !== this.pointeur,
                'bg-grille-2 dark:bg-dark-grille-2': (
                    (Math.floor((x - 1) / 3) % 2) + (Math.floor((y - 1) / 3) % 2)
                ) % 2 === 1 && this.calculIndex(x, y) !== this.pointeur,
                'bg-grille-3 dark:bg-dark-grille-3': (x - 1) * 9 + (y - 1) === this.pointeur
            }
        },
        calculIndex(x, y) {
            return (x - 1) * 9 + y - 1
        },
        updateTd(n) {
            if (this.pointeur !== null)
                this.tableau.splice(this.pointeur, 1, n)
        },
        solve() {
            axios.post(serverURL + "/", {
                tableau: this.tableau
            }).then(res => console.log(res))
        }
    },
    created() {
        // On initialise un tableau vide
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                this.tableau.push(0)

        // Ecoute des events click
        window.addEventListener('keyup', ev => {
            const n = parseInt(ev.key)
            if (0 <= n && n <= 9)
                this.updateTd(n)
        })
    }
}

Vue.createApp(SudokuSolver).mount("#sudoku-solver")