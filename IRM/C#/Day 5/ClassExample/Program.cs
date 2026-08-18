using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace ClassExample
{
	public class Student{
		public string name;
		public int mark;
        public void Display()
        {
            Console.WriteLine("Display inside Student");
        }	}
	public class ClassExample
	{
		public static void Main(string[] args)
		{
			Student s1=new Student();
			s1.name="Rohan";
			Student s2=new Student();
			s2.name="Farhan";
			Console.WriteLine(s1.name);
            s1.Display();
		}
	}
}