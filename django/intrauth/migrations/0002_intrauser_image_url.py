# Generated by Django 3.2.23 on 2023-12-26 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intrauth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='intrauser',
            name='image_url',
            field=models.CharField(max_length=255, null=True),
        ),
    ]