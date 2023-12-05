import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class CalculatorPanels extends JPanel  {

    private JButton[] numberButton = new JButton[10];
    private JButton[] mathButton = new JButton[4];

    private JButton ADD = new JButton("+");
    private JButton MINUS = new JButton("-");
    private JButton DIVIDE = new JButton("/");
    private JButton TIMES = new JButton("X");
    private JButton EQUAL = new JButton("=");
    private JButton period = new JButton(".");
    private JButton delete = new JButton("DEL");
    private JButton allClear = new JButton("AC");
    private JButton percentage = new JButton("%");
    private static double firstValue;
    private double total;
    private static char symbol = '\0';
    private String displayedNum = "";
    private JTextField display = new JTextField();
    private static int periodCount = 0;
    private Font calFont = new Font("Times New Roman",2, 30);



    //Constructor
    public CalculatorPanels(){

        this.setLayout(new GridLayout(5,4));
        this.setPreferredSize(new Dimension(400,480));

        this.setBackground(Color.lightGray);

        mathButton[0] = ADD;
        mathButton[1] = MINUS;
        mathButton[2] = DIVIDE;
        mathButton[3] = TIMES;

        this.add(allClear);
        this.add(delete);
        this.add(percentage);
        this.add(mathButton[2]);


        for (int i = 0; i < numberButton.length; i++){
            numberButton[i] = new JButton(String.valueOf(i));
            numberButton[i].setFont(calFont);
            numberButton[i].setPreferredSize(new Dimension(70, 70));
        }

        this.add(numberButton[7]);
        this.add(numberButton[8]);
        this.add(numberButton[9]);
        this.add(mathButton[3]);

        this.add(numberButton[4]);
        this.add(numberButton[5]);
        this.add(numberButton[6]);
        this.add(mathButton[1]);

        this.add(numberButton[1]);
        this.add(numberButton[2]);
        this.add(numberButton[3]);
        this.add(mathButton[0]);
        this.add(numberButton[0]);




        this.add(period);
        this.add(EQUAL);



        //add action listener & action event to all math buttons
        for (JButton button : mathButton) {
            button.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    symbol = e.getActionCommand().charAt(0);

                    if (displayedNum.length() > 0) {
                        firstValue = Double.parseDouble(displayedNum);
                    }
                }
            });

        }

        //add action listener & action event to all number buttons
        for (JButton jButton : numberButton) {
            jButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    displayNum(e);
                }
            });

        }

        // action listener for period button
        this.period.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // To prevent an invalid number format, make sure only one period is on the calculator display
                if (periodCount == 0) {
                    displayedNum += period.getActionCommand();
                    periodCount ++;
                    display.setText(displayedNum);
                }
            }
        });

        // action listener for delete button
        this.delete.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Make sure the delete button works when there is a number
                if (displayedNum.length() != 0) {
                    // if the "To be deleted number" is a period (.) --> reset the period count
                    if (displayedNum.charAt(displayedNum.length()-1) == '.'){
                        periodCount = 0;
                    }
                    displayedNum = displayedNum.substring(0, displayedNum.length() - 1);
                    display.setText(displayedNum);
                }
            }
        });


        // action listener for AC button
        this.allClear.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                periodCount = 0;
                symbol = '\0';
                displayedNum = "";
                display.setText("");

            }
        });


        // action listener for = sign. Calculate the input
        this.EQUAL.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

                calculate(firstValue, Double.parseDouble(displayedNum), symbol);
            }
        });

    }

    public JTextField showDisplay(){
        this.display.setPreferredSize(new Dimension(400,70));
        this.display.setFont(calFont);
        this.display.setEditable(false);
        return this.display;
    }


    private void cleanUp(){
        periodCount = 0;
        displayedNum = "";
        display.setText("");
    }


    //method to display the pressed number. This method is called when a number is pressed
    public void displayNum(ActionEvent e){
        // reset the display for the 2nd value
        if (symbol != '\0'){
           cleanUp();
        }
        int pressedValue = Integer.parseInt(e.getActionCommand());
        this.displayedNum += pressedValue;

        this.display.setText(this.displayedNum);

    }

    public void calculate(double firstValue, double secondValue, char symbol){
        switch (symbol) {
            case '+':
                total = firstValue + secondValue;
                displayedNum = String.valueOf(total);
                this.display.setText(displayedNum);
                break;
            case '-':
                total = firstValue - secondValue;
                displayedNum = String.valueOf(total);
                this.display.setText(displayedNum);
                break;
            case 'X':
                total = firstValue * secondValue;
                displayedNum = String.valueOf(total);
                this.display.setText(displayedNum);
                break;
            case '/':
                total = firstValue / secondValue;
                displayedNum = String.valueOf(total);
                this.display.setText(displayedNum);
                break;
        }


    }





}
