public class <%= appClassName %>{

    public static void main(String[] args){
      <% if(calcObjectNeeded == 'yes') {%>
        Calculator mycalc = new Calculator();
        int a,b; //two numbers you need to give values for
        <%}%>
    }

    public <%= methodReturntype %> <%= appMethodName %>(){
        //method logic here
    }

    <% if(secondClass=='yes') {%>
    //sample calculator class with add, subtract, divide and multiply functions
    public class Calculator{
      int res;

      //add method
      public int add(int a, int b){
        return a+b;
      }

      //subtract method
      public int subtract(int a, int b){
        return a-b;
      }

      //divide method
      public double divide(int a, int b){
        if(a==0||b==0)
          throw new IllegalArgumentException('None of the entered numbers can be zero');
        else
          return a/b;
      }

      //multiply method
      public int multiply(int a, int b){
        return a*b;
      }
    }
    <%}%>
}
