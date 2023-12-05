import java.util.Random;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;



public class GamePanel extends JPanel implements ActionListener {

    private static final int windowWidth = 600;
    private static final int windowHeight = 600;
    private static final int unitSize = 25;
    private static final int gameSize = (windowWidth * windowHeight);
    private static final int delay = 75;
    private final int x[] = new int[gameSize];
    private final int y[] = new int[gameSize];
    private int snakeLength = 4;
    private int score;

    //co-ordinates for apple
    private int appleX;
    private int appleY;
    private Random random;
    private char direction = 'R';
    private boolean running = false;
    private Timer timer;

    public GamePanel(){
        random = new Random();
        this.setPreferredSize(new Dimension(windowWidth, windowHeight));
        this.setBackground(Color.black);
        this.setFocusable(true);
        this.addKeyListener(new KeyControl());
        this.startGame();
    }

    public void paintComponent(Graphics g){
        super.paintComponent(g);
        drawGameBoard(g);
    }

    public void drawGameBoard(Graphics board){
            if (running) {
                board.setColor(Color.red);
                board.fillOval(appleX, appleY, unitSize, unitSize);

                for (int i = 0; i < snakeLength; i++) {
                    if (i == 0) {
                        //create block for the head
                        board.setColor(Color.GREEN);
                        board.fillRect(x[i], y[i], unitSize, unitSize);
                    } else {
                        //create blocks for the body
                        board.setColor(new Color(45, 180, 0));
                        board.fillRect(x[i], y[i], unitSize, unitSize);
                    }
                }
                board.setColor(Color.red);
                board.setFont(new Font("Ink Free", Font.BOLD, 40));
                FontMetrics metrics = getFontMetrics(board.getFont());
                board.drawString("Score: " + score, (windowWidth - metrics.stringWidth("Score: " + score)) / 2, board.getFont().getSize());

            } else {
                gameOver(board);
            }


    }

    public void startGame(){
        newApple();
        this.running = true;
        this.timer = new Timer(delay,this);
        timer.start();
    }

    public void checkCollision(){
        //check if the snake's head collides with its body
        for(int i = snakeLength;i > 0; i--) {
            if(x[0] == x[i] && y[0] == y[i]) {
                this.running = false;
            }
        }

        //check if the snake's head is touching the game window/edges
        if (x[0] < 0){
            this.running = false;
        }else if (x[0] > windowWidth){
            this.running = false;
        }else if (y[0] > windowHeight) {
            this.running = false;
        }else if (y[0] < 0) {
            this.running = false;
        }

        if (!running){
            timer.stop();
        }

    }

    public void move(){
        for (int i = this.snakeLength; i > 0; i--){
            x[i] = x[i-1];
            y[i] = y[i-1];
        }

        //snake direction based on the arrow keys
        switch(this.direction){
            case 'R':
                x[0] = x[0] + unitSize;
                break;
            case 'L':
                x[0] = x[0] - unitSize;
                break;
            case 'D':
                y[0] = y[0] + unitSize;
                break;
            case 'U':
                y[0] = y[0] - unitSize;
                break;
        }

    }


    private JButton retryButton = new JButton( new AbstractAction("Retry") {
        @Override
        public void actionPerformed( ActionEvent e ) {
            if (e.getSource() == retryButton){
                new GameFrame();
            }
        }
    });


    private JButton quitButton = new JButton( new AbstractAction("Quit") {
        @Override
        public void actionPerformed( ActionEvent e ) {
            if (e.getSource() == quitButton){
                System.exit(0);
            }
        }
    });

    public void gameOver(Graphics g){
        //Score
        g.setColor(Color.red);
        g.setFont( new Font("Ink Free",Font.BOLD, 40));
        FontMetrics metrics1 = getFontMetrics(g.getFont());
        g.drawString("Score: "+score, (windowWidth - metrics1.stringWidth("Score: "+score))/2, g.getFont().getSize());

        //Game Over text
        g.setColor(Color.red);
        g.setFont( new Font("Ink Free",Font.BOLD, 75));
        FontMetrics metrics2 = getFontMetrics(g.getFont());
        g.drawString("Game Over", (windowWidth - metrics2.stringWidth("Game Over"))/2, windowHeight/3);

        // retry button
        retryButton.setText("Retry");
        retryButton.setFont( new Font("Ink Free",Font.BOLD, 20));
        retryButton.setForeground(Color.green);
        retryButton.addActionListener(this);
        retryButton.setSize(300, 300);
        retryButton.setBounds(250, 400, 100, 50);
        this.add(retryButton);

        //quit button
        quitButton.setText("Quit");
        quitButton.setFont( new Font("Ink Free",Font.BOLD, 20));
        quitButton.setForeground(Color.RED);
        quitButton.addActionListener(this);
        quitButton.setSize(300, 300);
        quitButton.setBounds(250, 450, 100, 50);
        this.add(quitButton);

    }

    public void checkApple(){
        //check if the snake's head is on the apple
        if (x[0] == appleX && y[0] == appleY){
            this.score ++;
            this.snakeLength ++;
            this.newApple();
        }
    }

    public void newApple(){
        this.appleX = random.nextInt(windowWidth/unitSize) * unitSize;
        this.appleY = random.nextInt(windowHeight/unitSize) * unitSize;
    }


    @Override
    public void actionPerformed(ActionEvent e) {
        if (running){
            move();
            checkApple();
            checkCollision();
        }
        repaint();

    }


    public class KeyControl extends KeyAdapter{
        @Override
        public void keyPressed(KeyEvent key){
            switch(key.getKeyCode()) {
                case KeyEvent.VK_LEFT:
                    if(direction != 'R') {
                        direction = 'L';
                    }
                    break;
                case KeyEvent.VK_RIGHT:
                    if(direction != 'L') {
                        direction = 'R';
                    }
                    break;
                case KeyEvent.VK_DOWN:
                    if(direction != 'D') {
                        direction = 'D';
                    }
                    break;
                case KeyEvent.VK_UP:
                    if(direction != 'U') {
                        direction = 'U';
                    }
                    break;

            }

        }
    }

}
