let canvas = document.getElementById('gobang')
        let title = document.getElementById('title')
        let playGame = document.querySelector('.playGame')
        let context = canvas.getContext('2d')
        playGame.addEventListener('click',() => {
            location.reload()
        })
        //绘制网格
        for (let i = 0; i < 15; i++) {
            context.moveTo(i * 30 + 15, 15)
            context.lineTo(i * 30 + 15, 435)
            context.stroke()
        }
        for (let j = 0; j < 15; j++) {
            context.moveTo(15, j * 30 + 15)
            context.lineTo(435, j * 30 + 15)
            context.stroke()
        }
        //设置赢法数组
        //用三维数组初始化
        let wins = []
        for (let i = 0; i < 15; i++) {
            wins[i] = []
        }
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                wins[i][j] = []
            }
        }
        //设置x轴赢法
        let count = 0 //记录赢法的个数
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 11; j++) {
                for (let k = 0; k < 5; k++) {
                    wins[j + k][i][count] = true
                }
                count++
            }
        }

        //设置y轴赢法
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 11; j++) {
                for (let k = 0; k < 5; k++) {
                    wins[i][j + k][count] = true
                }
                count++
            }
        }
        //设置正斜轴赢法
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                for (let k = 0; k < 5; k++) {
                    wins[i + k][j + k][count] = true
                }
                count++
            }
        }
        //设置反斜轴赢法
        for (let i = 0; i < 11; i++) {
            for (let j = 14; j > 3; j--) {
                for (let k = 0; k < 5; k++) {
                    wins[i + k][j - k][count] = true
                }
                count++
            }
        }

        //记录当前位置是否已落子
        window.occupied = []
        for (let i = 0; i < 15; i++) {
            occupied[i] = []
        }
        for (let i = 0; i < 15; i++) {
            for (j = 0; j < 15; j++) {
                occupied[i][j] = 0
            }
        }
        //开始下棋
        let isMe = true //判断人是否可以落子
        let isOver = false //判断游戏是否已结束
        let x, y //落子坐标值
        let myWin = [] //人在某一种赢法上的分值，每次落子在这种赢法上分值就+1.
        let computerWin = [] //计算机在某种赢法上的分值
        for (let i = 0; i < count; i++) {
            myWin[i] = 0
            computerWin[i] = 0
        }
        canvas.addEventListener('click', (e) => {
            x = Math.floor(e.offsetX / 30)
            y = Math.floor(e.offsetY / 30)
            if (!isOver) {
                //是否轮到人落子
                if (isMe) {
                    if (!occupied[x][y]) {
                        drawPoint(x, y, 'black')
                        occupied[x][y] = 1
                        isMe = !isMe
                        isWin()
                    }
                }
                //是否计算机落子
                if (!isOver && !isMe) {
                    computerAI()
                    isMe = !isMe
                }
            }
            return
        })