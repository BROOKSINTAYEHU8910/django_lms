# Generated by Django 4.1.1 on 2022-10-21 13:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0034_coursequiz_teacher'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttempQuiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('question', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.quizquestion')),
                ('student', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.student')),
            ],
            options={
                'verbose_name_plural': '14. Attempted Quiz ',
            },
        ),
    ]