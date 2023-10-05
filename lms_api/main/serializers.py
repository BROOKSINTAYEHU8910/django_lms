    
from dataclasses import field, fields
from urllib import request
from rest_framework import serializers
from  .models import Teacher
from  . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields=['id', 'full_name', 'email', 'password','qualification', 'mobile_no','skills','profile_img','teacher_courses','skill_list']
    def __init__(self,  *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 1
            

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields=['total_teacher_courses', 'total_teacher_students', 'total_teacher_chapters']
        
class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields=['enrolled_courses', 'favorite_courses', 'completed_assignments','pending_assignments']
        
        

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields=['id', 'title', 'description']
        
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields=['id', 'category', 'teacher','title',  'description',  'featured_img', 'techs','course_chapters','tech_list', 'total_enrolled_students','course_rating']
        depth=1
        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields=['id', 'course','title',  'description',  'video', 'remarks','total_teacher_chapters']
    
    def __init__(self,  *args, **kwargs):
        super(ChapterSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 1        
    

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields=['id', 'full_name', 'email','profile_img',  'password','username','interested_categories']
        
    def __init__(self,  *args, **kwargs):
        super(StudentSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
        

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields=['id', 'course', 'student','enrolled_time']
        
        
    def __init__(self,  *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
        
        
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields=['id', 'course', 'student','rating','review','review_time']
        
        
        
    def __init__(self,  *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
            
            
            
class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavoriteCourse
        fields=['id', 'course', 'student','status']
        
        
        
    def __init__(self,  *args, **kwargs):
        super(StudentFavoriteCourseSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
            
            
class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignemt
        fields=['id', 'teacher', 'student','title','detail','student_status','add_time']
        
        
        
    def __init__(self,  *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
            
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Notification
        fields=['id','teacher','student','notif_subject','notif_for','notif_created_time','notifiread_status']
        
    def __init__(self,  *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
            
            
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Quiz
        fields=['id','teacher','title','detail','add_time','assign_status']
        
    def __init__(self,  *args, **kwargs):
        super(QuizSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
            

            
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.QuizQuestion
        fields=['id','quiz','questions','ans1','ans2','ans3','ans4','right_ans']
        
    def __init__(self,  *args, **kwargs):
        super(QuestionSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2
            

class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields=['id','teacher', 'course', 'quiz','add_time']
        
        
    def __init__(self,  *args, **kwargs):
        super(CourseQuizSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2 
            
class AttempQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AttempQuiz
        fields=['id','student','right_ans', 'question','add_time']
        
        
    def __init__(self,  *args, **kwargs):
        super(AttempQuizSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2       
            

class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterial
        fields=['id', 'course','title',  'description',  'upload', 'remarks']
    
    def __init__(self,  *args, **kwargs):
        super(StudyMaterialSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth = 2 