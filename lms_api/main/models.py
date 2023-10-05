
from email.headerregistry import Address
from email.policy import default
from enum import auto
import profile
from tabnanny import verbose
from turtle import title
from unittest.util import _MAX_LENGTH
from django.db import models



# Teacher mode

class Teacher(models.Model):
    full_name=models.CharField(max_length=100, null=False, blank=False)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,blank=True,null=True)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20,blank=True,null=True)
    profile_img = models.ImageField(upload_to='teacher_profile_imgs/' ,null=True)
    skills = models.TextField()
    

    class Meta:
        verbose_name_plural = "01.Teachers"
        
        
    def skill_list(self):
         skill_list=self.skills.split(',')
         return skill_list
     
    def total_teacher_courses(self):
         total_courses=Course.objects.filter(teacher=self).count()
         return total_courses
     
    def total_teacher_chapters(self):
        total_chapters=Chapter.objects.filter(course__teacher=self).count()
        return total_chapters
    def total_teacher_students(self):
        total_students=StudentCourseEnrollment.objects.filter(course__teacher=self).count()
        return total_students
    
    def __str__(self):
        return f"{self.full_name}"
    
     
     
         


class CourseCategory(models.Model):
    title=models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural="02.Course Categories"
        
    def __str__(self):
        return self.title


# course mode

class Course(models.Model):
    category=models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/',null=True)
    techs = models.TextField(null=True)
    course_view = models.BigIntegerField(default=0)

    class Meta:
        verbose_name_plural = "03. Courses"
        
   
        
    
    def tech_list(self):
        tech_list=self.techs.split(',')
        return tech_list
    
    def total_enrolled_students(self):
        total_enrolled_students=StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students
    
    def course_rating(self):
        course_rating=CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']
        
    def __str__(self):
        return self.title
    
    
        
        
        
        
        
class Chapter(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/',null=True)
    remarks = models.TextField(null=True)
    
    def total_teacher_chapters(self):
        total_chapters=Chapter.objects.filter(course__teacher=self).count()

    class Meta:
        verbose_name_plural = "04. Chapters"


# Student mode

class Student(models.Model):
    full_name=models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,blank=True,null=True)
    username = models.CharField(max_length=100)
    interested_categories = models.TextField()
    profile_img = models.ImageField(upload_to='student_profile_imgs/' ,null=True)

    class Meta:
        verbose_name_plural = "05.Students"
        
    def enrolled_courses(self):
         enrolled_courses=StudentCourseEnrollment.objects.filter(student=self).count()
         return enrolled_courses
     
    def favorite_courses(self):
        favorite_courses=StudentFavoriteCourse.objects.filter(student=self).count()
        return favorite_courses
    def completed_assignments(self):
        completed_assignments=StudentAssignemt.objects.filter(student=self, student_status=True).count()
        return completed_assignments
    def pending_assignments(self):
        pending_assignments=StudentAssignemt.objects.filter(student=self, student_status=False).count()
        return pending_assignments
        
    def __str__(self):
        return f"{self.full_name}"
        

class StudentCourseEnrollment(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='enrolled_courses',null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "06. Enrolled Courses"
        
    def __str__(self):
        return f"{self.course}.{self.student}"
        
        

        
        
class StudentFavoriteCourse(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    status=models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = "07. Student  Favorite Courses"
        
    def __str__(self):
        return f"{self.course}.{self.student}"
    
    
class CourseRating(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    rating=models.PositiveBigIntegerField(default=0)
    review=models.TextField(null=True)
    review_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "08.  Courses Rating"
    
    def __str__(self):
        return f"{self.course}.{self.student}.{self.rating}"
    
class StudentAssignemt(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    title=models.CharField(max_length=300)
    detail=models.TextField(null=True)
    student_status=models.BooleanField(default=False)
    add_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "09.  Student Assignment "
    
    def __str__(self):
        return f"{self.student}"
    
    
    
class Notification(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    notif_subject=models.CharField(max_length=300,verbose_name='Notification Subject',null=True)
    notif_for=models.CharField(max_length=300,verbose_name='Notification for',null=True)
    notif_created_time=models.DateTimeField(auto_now_add=True)
    notifiread_status=models.BooleanField(default=False,verbose_name='Notification Status')
    
    class Meta:
        verbose_name_plural = "10. Notification "
        
        
class Quiz(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    title=models.CharField(max_length=300)
    detail=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)
    
    def assign_status(self):
        return CourseQuiz.objects.filter(quiz=self).count()
    
    
    class Meta:
        verbose_name_plural = "11. Quiz "
        
class QuizQuestion(models.Model):
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    questions=models.CharField(max_length=300)
    ans1=models.CharField(max_length=300)
    ans2=models.CharField(max_length=300)
    ans3=models.CharField(max_length=300)
    ans4=models.CharField(max_length=300,default=False)
    right_ans=models.CharField(max_length=300)
    add_time=models.DateTimeField(auto_now_add=True)
    
   
    
    
    class Meta:
        verbose_name_plural = "12. Quiz Question"
        
   
class CourseQuiz(models.Model):
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    course=models.ForeignKey(Course,on_delete=models.CASCADE,null=True)
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    
    
    class Meta:
        verbose_name_plural = "13. Course Quiz " 
        
class AttempQuiz(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    question=models.ForeignKey(QuizQuestion,on_delete=models.CASCADE,null=True)
    right_ans=models.CharField(max_length=300,null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    
    
    class Meta:
        verbose_name_plural = "14. Attempted Quiz "       
        

class StudyMaterial(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    upload = models.FileField(upload_to='study_materials/',null=True)
    remarks = models.TextField(null=True)
    
    

    class Meta:
        verbose_name_plural = "15. Study Material"




