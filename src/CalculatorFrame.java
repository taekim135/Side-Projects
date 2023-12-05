import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;



public class CalculatorFrame extends JFrame {

    CalculatorPanels panel;

    public CalculatorFrame() {
        panel = new CalculatorPanels();
        this.add(panel.showDisplay());
        this.add(panel);
        this.setLayout(new FlowLayout());
        this.setSize(400,600);
        this.setTitle("Calculator");
        this.setLocationRelativeTo(null);
        this.setResizable(false);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setVisible(true);
    }




}
