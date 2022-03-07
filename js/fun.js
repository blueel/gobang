//判断人是否获胜
const isWin = () => {
    for(let i=0;i<count;i++){
        if(wins[x][y][i]){
            myWin[i]++
            if(myWin[i]==5){
                title.innerHTML = '恭喜你获胜了~~~~'
                isOver=true
            }
        }
    }
}
//绘制棋子
const drawPoint = (x,y,color) => {
    context.beginPath()
    context.arc(x * 30 + 15, y * 30 + 15, 13, 0, 2 * Math.PI)
    context.fillStyle = color
    context.fill()
    context.closePath()
}
//计算机落子
const computerAI = () => {
    let myScore = []
    let computerScore = []
    //初始化我和计算机的分数
    for(let i=0 ;i<15;i++){
        myScore[i] = []
        computerScore[i] = []
        for(let j=0;j<15;j++) {
            myScore[i][j] = 0
            computerScore[i][j] = 0
        } 
    }

    let maxScore = 0    //最大分值
    let x = 0,y = 0      //最大分值坐标

    for(let i=0;i<15;i++){
        for(let j=0;j<15;j++){
            if(!occupied[i][j]){
                for(let k=0;k<count;k++){
                    if(wins[i][j][k]){
                        switch(myWin[k]){
                            case 1:
                                {
                                    myScore[i][j] += 200
                                    break
                                }
                            case 2:
                                myScore[i][j] += 400
                                break
                            case 3: 
                                myScore[i][j] += 2000
                                break
                            case 4:
                                myScore[i][j] += 10000
                                break
                        }
                        // if(myWin[k]==1){
                        //     myScore[i][j] += 200
                        // }else if(myWin[k]==2){
                        //     myScore[i][j] += 400
                        // }else if(myWin[k]==3){
                        //     myScore[i][j] += 800
                        // }else if(myWin[k]==4){
                        //     myScore[i][j] += 10000
                        // }

                        // if(computerWin[k]==1){
                        //     computerScore[i][j] += 250
                        // }else if(computerWin[k]==2){
                        //     computerScore[i][j] += 450
                        // }else if(computerWin[k]==3){
                        //     computerScore[i][j] += 850
                        // }else if(computerWin[k]==4){
                        //     computerScore[i][j] += 15000
                        // }
                        switch(computerWin[k]){
                            case 1:
                                computerScore[i][j] += 220
                                break
                            case 2:
                                computerScore[i][j] += 420
                                break
                            case 3: 
                                computerScore[i][j] += 2200
                                break
                            case 4:
                                computerScore[i][j] += 12000
                                break
                        }
                    }
                }
                if(myScore[i][j]>maxScore){
                    maxScore = myScore[i][j]
                    x=i
                    y=j
                }else if(myScore[i][j]==maxScore){
                    if(computerScore[i][j]>maxScore){
                        maxScore= computerScore[i][j]
                        x=i
                        y=j
                    }
                }
                if(computerScore[i][j]>maxScore){
                    maxScore = computerScore[i][j]
                    x=i
                    y=j
                }else if(computerScore[i][j]==maxScore){
                    if(myScore[i][j]>maxScore){
                        maxScore = myScore[i][j]
                        x=i
                        y=j
                    }
                }
                console.log('maxScore',maxScore);
            }
        }
    }
    drawPoint(x,y,'white')
    console.log('计算机',x,y);
    occupied[x][y] = 1
    for(let i=0;i<count;i++){
        if(wins[x][y][i]){
            computerWin[i]++
            if(computerWin[i]==5){
                title.innerHTML = '很遗憾，计算机获胜了~~~~'
                isOver=true
            }
        }
    }

}