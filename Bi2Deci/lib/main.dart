import 'package:flutter/material.dart';
import 'package:string_validator/string_validator.dart';

void main() {
  runApp(UIWidget());
}

// class/widget for basic UI setup
// immutable elements
// root widget
class UIWidget extends StatelessWidget {
  const UIWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Bi2Deci"),
          backgroundColor: Colors.green,
        ),

        // Top row - 2 unit fields & labels
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Center(child: Text("Binary")),

            // "padding"
            SizedBox(width: 150, child: InputWidget()),
          ],
        ),
      ),
    );
  }
}

// widget for user input field
// should also validate the input
// immutable widget itself
// functions as a factory to create stateful object
class InputWidget extends StatefulWidget {
  const InputWidget({super.key});

  @override
  State<InputWidget> createState() => _InputWidgetState();
}

// This is the mutable state of the widget
// indicated by "_" at the start of name
// Calculate the conversion when button clicked
class _InputWidgetState extends State<InputWidget> {
  final userDataController = TextEditingController();
  String result = "";

  // binary -> deicmal
  // input already validated
  int conversion(int binary) {
    int decimal = 0;
    int increment = 1;

    while (binary >= 10) {
      int digit = binary % 10;
      if (digit == 1) {
        decimal += increment;
      }

      increment *= 2;

      // truncating division
      // dart regular / results in double
      // use num var
      binary = binary ~/ 10;
    }
    decimal += increment;
    return decimal;
  }

  // stops taking user input
  @override
  void dispose() {
    userDataController.dispose();
    super.dispose();
  }

  // method to build the widget
  // input + button
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(controller: userDataController),
        SizedBox(height: 10),
        OutlinedButton(
          onPressed: () {
            setState(() {
              String userData = userDataController.text;

              // binary validation
              if (userData == "" || userData.isEmpty) {
                result = "Please enter a binary number";
              } else if (!isNumeric(userData)) {
                result = "Please enter numbers only";
              } else if (userData.length > 8) {
                result = "The maximum binary length should be 8 bits";
              } else if (!RegExp(r'^[01]+$').hasMatch(userData)) {
                result = "Please enter 0 or 1 only";
              } else {
                result = conversion(int.parse(userData)).toString();
              }
            });
          },
          child: Text("Convert"),
        ),
        SizedBox(height: 30),
        Center(child: Text("Decimal")),
        SizedBox(height: 10),
        SizedBox(width: 150, child: Text(result)),
      ],
    );
  }
}
