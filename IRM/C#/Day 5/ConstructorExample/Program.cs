using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace ConstructorExample
{
	public class Student{
		public string name;
		public int mark;
        public Student()
        {
            name="Farhan";
            mark=85;
        }
        public Student(String name,int mark)
        {
            this.name=name;
            this.mark=mark;
        }
        public void Display()
        {
            Console.WriteLine("The Name is :"+name);
            Console.WriteLine("The Mark is :"+mark);
        }	}
	public class ConstructorExample
	{
		public static void Main(string[] args)
		{
			Student s1=new Student();
			s1.Display();
			Student s2=new Student("Rahul",30);
            s2.Display();
		}
	}
}