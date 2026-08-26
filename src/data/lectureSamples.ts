import { LectureSample } from '../types';

export const LECTURE_SAMPLES: LectureSample[] = [
  {
    id: 'lec-physics',
    title: 'Kinematics & Projectile Motion Dynamics',
    subject: 'Class 11 Physics',
    duration: '45 mins (Sample Slice)',
    instructor: 'Prof. R. Sundaram (Govt Hr Sec School)',
    audioTimestamp: 0,
    transcriptLines: [
      {
        time: 0,
        speaker: 'Teacher',
        text: 'Good morning students! Today we explore parabolic projectile motion. Let us write down the vertical displacement equation under constant gravity.',
        action: 'Drawing $y(t) = v_0 \\sin(\\theta) t - \\frac{1}{2}g t^2$ on blackboard',
      },
      {
        time: 5,
        speaker: 'Teacher',
        text: 'Notice that horizontal velocity $v_x = v_0 \\cos(\\theta)$ remains constant if air resistance is negligible. Let us sketch the velocity vector decomposition.',
        action: 'Sketching coordinate axis and trajectory arc with angle $\\theta$',
      },
      {
        time: 12,
        speaker: 'Student (Question)',
        text: 'Sir, at the maximum peak height $H_{\\max}$, is the total velocity zero or only vertical velocity?',
        action: 'Highlighting peak vertex $(x_{\\text{peak}}, y_{\\text{peak}})$ with amber chalk',
      },
      {
        time: 18,
        speaker: 'Teacher',
        text: 'Excellent question! Only the vertical component $v_y = 0$. The horizontal component $v_x$ is still active, which is why the projectile continues moving forward.',
        action: 'Underlining $v_y = 0, v_x = v_0 \\cos\\theta$',
      },
    ],
    generatedNotes: {
      summary: 'Comprehensive analysis of 2D projectile motion decomposing velocity vectors into independent horizontal $(x)$ and vertical $(y)$ components under uniform gravitational acceleration $g = 9.8\\text{ m/s}^2$.',
      keyPoints: [
        'Horizontal motion is non-accelerated: $a_x = 0 \\implies v_x(t) = v_0 \\cos(\\theta)$.',
        'Vertical motion is subjected to downward gravity: $a_y = -g \\implies v_y(t) = v_0 \\sin(\\theta) - gt$.',
        'Maximum height occurs when vertical velocity reaches zero: $H_{\\max} = \\frac{v_0^2 \\sin^2(\\theta)}{2g}$.',
        'Total time of flight: $T = \\frac{2 v_0 \\sin(\\theta)}{g}$.',
        'Maximum horizontal range: $R = \\frac{v_0^2 \\sin(2\\theta)}{g}$ (achieved at $\\theta = 45^\\circ$).',
      ],
      equations: [
        'y(t) = v_0 \\sin(\\theta)t - \\frac{1}{2}gt^2',
        'x(t) = v_0 \\cos(\\theta)t',
        'R = \\frac{v_0^2 \\sin(2\\theta)}{g}',
        'H_{\\max} = \\frac{v_0^2 \\sin^2(\\theta)}{2g}',
      ],
      quiz: [
        {
          question: 'At the apex of a projectile trajectory, which velocity component is non-zero?',
          options: ['Vertical velocity', 'Horizontal velocity', 'Both are zero', 'Both are maximal'],
          answer: 1,
        },
        {
          question: 'What angle of projection yields the maximum horizontal range on flat ground?',
          options: ['30 degrees', '45 degrees', '60 degrees', '90 degrees'],
          answer: 1,
        },
      ],
    },
  },
  {
    id: 'lec-calculus',
    title: 'Differential Calculus & Chain Rule Integration',
    subject: 'Class 12 Mathematics',
    duration: '50 mins (Sample Slice)',
    instructor: 'Mrs. Ananya Sharma',
    audioTimestamp: 0,
    transcriptLines: [
      {
        time: 0,
        speaker: 'Teacher',
        text: 'Let us consider the composite function $f(g(x))$. When finding its derivative with respect to $x$, we apply the Chain Rule.',
        action: 'Writing $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$',
      },
      {
        time: 7,
        speaker: 'Teacher',
        text: 'For example, take $y = \\sin(x^3 + 2x)$. Here the outer function is sine, and inner is polynomial.',
        action: 'Differentiating step-by-step: $\\cos(x^3 + 2x) \\cdot (3x^2 + 2)$',
      },
    ],
    generatedNotes: {
      summary: 'Derivation and step-by-step application of the Chain Rule for composite differentiable functions with real-world tangent gradient calculations.',
      keyPoints: [
        'The derivative of composite function $f(g(x))$ is outer derivative multiplied by inner derivative.',
        'Leibniz notation: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$.',
        'Essential for logarithmic differentiation and implicit differentiation.',
      ],
      equations: [
        '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) g\'(x)',
        '\\frac{d}{dx}[\\sin(u)] = \\cos(u) \\frac{du}{dx}',
      ],
      quiz: [
        {
          question: 'What is the derivative of $\\ln(x^2)$?',
          options: ['1/x^2', '2/x', '2x', 'x/2'],
          answer: 1,
        },
      ],
    },
  },
];
